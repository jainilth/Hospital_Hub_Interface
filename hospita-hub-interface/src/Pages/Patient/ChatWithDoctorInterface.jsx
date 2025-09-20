import React, { useState, useRef, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import "./ChatWithDoctorInterface.css";

const ChatWithDoctorInterface = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [loading, setLoading] = useState(true);
  const [partnerName, setPartnerName] = useState("");
  const messagesEndRef = useRef(null);

  // ✅ Get doctorId and patientId from URL query string
  const [searchParams] = useSearchParams();
  const doctorId = parseInt(searchParams.get("doctorId"), 10);
  const patientIdFromUrl = parseInt(searchParams.get("patientId"), 10);

  // ✅ Decode JWT from localStorage
  const token = localStorage.getItem("token");
  const decoded = token ? jwtDecode(token) : null;
  const patientId = decoded ? parseInt(decoded.sub, 10) : null;
  const userRole = decoded ? decoded.role : null;

  // Use patientId from URL if available (for admin), otherwise use from JWT (for patient)
  const currentPatientId = patientIdFromUrl || patientId;

  console.log(decoded, patientId, userRole, doctorId, currentPatientId);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Function to load messages from server
  const loadMessages = async () => {
    if (!doctorId || !currentPatientId) return [];

    try {
      const messagesResponse = await axios.get(
        `http://localhost:5220/api/Chat/GetMSG?doctorId=${doctorId}&patientId=${currentPatientId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Transform messages to match our format
      const transformedMessages = messagesResponse.data.map((msg) => {
        // Universal rule: Sender's messages → Right side, Receiver's messages → Left side
        // Determine if message is from current user (sender) or from chat partner (receiver)
        let isSelf = false;

        if (userRole === "User") {
          // Patient is the current user: their messages go to the right
          isSelf = msg.sendBy === currentPatientId;
        } else if (userRole === "Admin") {
          // Admin is the current user: their messages (sent on behalf of doctor) go to the right
          isSelf = msg.sendBy === doctorId;
        }

        return {
          id: msg.messageId,
          text: msg.message1,
          senderId: msg.sendBy,
          isSelf: isSelf,
          status: "sent",
          timestamp: new Date(msg.createdAt),
          senderType: msg.senderType,
          senderName: msg.senderName,
        };
      });

      return transformedMessages;
    } catch (error) {
      console.error("Error loading messages:", error);
      return [];
    }
  };

  // Load previous messages and partner name on component mount
  useEffect(() => {
    const loadChatData = async () => {
      if (!doctorId || !currentPatientId) {
        setLoading(false);
        return;
      }

      try {
        // Load previous messages
        const previousMessages = await loadMessages();
        setMessages(previousMessages);

        // Load partner name
        const nameResponse = await axios.get(
          `http://localhost:5220/api/Chat/GetChatPartnerName?doctorId=${doctorId}&patientId=${currentPatientId}&userRole=${userRole}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setPartnerName(nameResponse.data.partnerName);
      } catch (error) {
        console.error("Error loading chat data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadChatData();
  }, [doctorId, currentPatientId, userRole, token]);

  // Real-time updates - poll for new messages every 3 seconds
  useEffect(() => {
    if (!doctorId || !currentPatientId || loading) return;

    const pollInterval = setInterval(async () => {
      try {
        const serverMessages = await loadMessages();
        const currentMessageIds = new Set(messages.map((m) => m.id));

        // Check if there are new messages
        const newMessages = serverMessages.filter(
          (msg) => !currentMessageIds.has(msg.id)
        );

        if (newMessages.length > 0) {
          // Update messages with new ones
          setMessages((prev) => {
            const updatedMessages = [...prev];
            newMessages.forEach((newMsg) => {
              if (!updatedMessages.find((m) => m.id === newMsg.id)) {
                updatedMessages.push(newMsg);
              }
            });
            // Sort by timestamp to maintain chronological order
            return updatedMessages.sort(
              (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
            );
          });
        }
      } catch (error) {
        console.error("Error polling for new messages:", error);
      }
    }, 3000); // Poll every 3 seconds

    return () => clearInterval(pollInterval);
  }, [doctorId, currentPatientId, messages, loading, userRole, token]);

  console.log(userRole);

  // ✅ Optimistic Send
  const handleSend = async () => {
    if (!inputText.trim() || !token) return;

    const tempId = Date.now(); // temporary id

    // Determine sender info based on role
    let senderId, senderType, senderName;
    if (userRole === "Admin") {
      // Admin sends messages on behalf of doctor
      senderId = doctorId;
      senderType = "Doctor";
      senderName = "You (Admin)";
    } else {
      // Patient sends their own messages
      senderId = currentPatientId;
      senderType = "Patient";
      senderName = "You";
    }

    // create optimistic message
    const userMessage = {
      id: tempId,
      text: inputText,
      senderId: senderId,
      isSelf: true,
      status: "sending", // track status
      timestamp: new Date(),
      senderType: senderType,
      senderName: senderName,
    };

    // show immediately
    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
    setIsTyping(true);

    try {
      // Send message with correct userRole for backend
      const response = await axios.post(
        "http://localhost:5220/api/Chat/send",
        {
          doctorId: doctorId,
          patientId: currentPatientId,
          message: userMessage.text,
          userRole: userRole === "Admin" ? "Admin" : "User", // Backend expects "User" for patients
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

  if (loading) {
    return (
      <div className="chatbot-container">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading chat...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="chatbot-container">
      <div className="chatbot-header">
        <div className="header-content">
          <div className="bot-avatar">💬</div>
          <div className="bot-info">
            <h3>{partnerName || "Live Chat"}</h3>
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
              {/* Sender info for received messages */}
              {!message.isSelf && (
                <div className="sender-info">
                  <span className="sender-name">
                    {message.senderName || message.senderType}
                  </span>
                </div>
              )}

              <p className="message-text">{message.text}</p>

              <div className="message-footer">
                <span className="timestamp">
                  {message.timestamp.toLocaleString([], {
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>

                {/* Status indicators for sent messages */}
                {message.isSelf && (
                  <div className="message-status">
                    {message.status === "sending" && (
                      <span className="status-sending">⏳</span>
                    )}
                    {message.status === "sent" && (
                      <span className="status-sent">✓</span>
                    )}
                    {message.status === "failed" && (
                      <span className="status-failed">✗</span>
                    )}
                    <span className="sent-label">Sent</span>
                  </div>
                )}
              </div>
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
