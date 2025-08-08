import React from 'react';
import SendMessageForm from './SendMessageForm';
import MessageContainer from './MessageContainer';
import ConnectedUsers from './ConnectedUsers';
import './chat.css';

export default function Chat({ sendMessage, messages, users, closeConnection }) {
  return (
    <div className="chat-wrapper">
      <div className='leave-room'>
        <button onClick={closeConnection}>Leave Room</button>
      </div>
      <div className="chat-content">
        <ConnectedUsers users={users} />
        <div className='chat'>
          <MessageContainer messages={messages} />
          <SendMessageForm sendMessage={sendMessage} />
        </div>
      </div>
    </div>
  );
}
