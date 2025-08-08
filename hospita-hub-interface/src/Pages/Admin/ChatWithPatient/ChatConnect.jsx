import React, { useEffect, useState } from 'react';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import Chat from './Chat';

export default function ChatConnect() {
  const [connection, setConnection] = useState(null);
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);

  const joinRoom = async (user, room) => {
    try {
      const conn = new HubConnectionBuilder()
        .withUrl("http://localhost:5220/chat")
        .configureLogging(LogLevel.Information)
        .build();

      conn.on("ReceiveMessage", (user, message) => {
        setMessages(prev => [...prev, { user, message }]);
      });

      conn.on("UsersInRoom", (users) => {
        setUsers(users);
      });

      conn.onclose(() => {
        setConnection(null);
        setMessages([]);
        setUsers([]);
      });

      await conn.start();
      await conn.invoke("JoinRoom", { user, room });

      setConnection(conn);
    } catch (e) {
      console.error("Connection error:", e);
    }
  };

  const sendMessage = async (message) => {
    try {
      await connection.invoke("SendMessage", message);
    } catch (e) {
      console.error("Send error:", e);
    }
  };

  const closeConnection = async () => {
    try {
      await connection.stop();
    } catch (e) {
      console.error("Close error:", e);
    }
  };

  // 🔁 Auto join the room as 'Doctor'
  useEffect(() => {
    joinRoom("Doctor", "DoctorPatientRoom");
  }, []);

  return (
    <div>
      <h2>Doctor Chat</h2>
      <hr className='line' />
      {connection && (
        <Chat
          sendMessage={sendMessage}
          messages={messages}
          users={users}
          closeConnection={closeConnection}
        />
      )}
    </div>
  );
}
