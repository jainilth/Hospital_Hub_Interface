import React, { useState, useRef, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import "./ChatWithDoctorInterface.css";

const ChatWithDoctorInterface = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // ✅ Get doctorId from URL query string
  const [searchParams] = useSearchParams();
  const doctorId = parseInt(searchParams.get("doctorId"), 10);

  // ✅ Decode JWT from localStorage
  const token = localStorage.getItem("token");
  const decoded = token ? jwtDecode(token) : null;
  const patientId = decoded ? parseInt(decoded.sub, 10) : null;
  const userRole = decoded ? decoded.role : null;
  
  console.log(decoded, patientId, userRole, doctorId);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  console.log(userRole)

  // ✅ Optimistic Send
  const handleSend = async () => {
    if (!inputText.trim() || !token) return;

    const tempId = Date.now(); // temporary id

    // create optimistic message
    const userMessage = {
      id: tempId,
      text: inputText,
      senderId: patientId,
      isSelf: true,
      status: "sending", // track status
      timestamp: new Date(),
    };

    // show immediately
    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
    setIsTyping(true);



    try {
      const response = await axios.post(
        "http://localhost:5220/api/Chat/send",
        {
          doctorId: doctorId,
          patientId: patientId,
          message: userMessage.text,
          userRole: userRole,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // mark as sent ✅
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === tempId ? { ...msg, status: "sent" } : msg
        )
      );
    } catch (err) {
      console.error("Error sending message:", err);

      // mark as failed ❌
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === tempId ? { ...msg, status: "failed" } : msg
        )
      );
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-header">
        <div className="header-content">
          <div className="bot-avatar">💬</div>
          <div className="bot-info">
            <h3>Live Chat</h3>
            <span className="status">Online</span>
          </div>
        </div>
      </div>

      <div className="messages-container">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`message ${
              message.isSelf ? "user-message" : "bot-message"
            }`}
          >
            <div className="message-content">
              <p>{message.text}</p>
              <span className="timestamp">
                {message.timestamp.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
                {message.isSelf && (
                  <>
                    {message.status === "sending" && " ⏳"}
                    {message.status === "sent" && " ✅"}
                    {message.status === "failed" && " ❌"}
                  </>
                )}
              </span>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="message bot-message">
            <div className="message-content">
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="input-container">
        <div className="input-wrapper">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className="message-input"
            rows="1"
          />
          <button
            onClick={handleSend}
            disabled={!inputText.trim()}
            className="send-button"
            style={{ marginLeft: "95%" }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="m12 19-7-7 7-7"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                transform="rotate(180 12 12)"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatWithDoctorInterface;
