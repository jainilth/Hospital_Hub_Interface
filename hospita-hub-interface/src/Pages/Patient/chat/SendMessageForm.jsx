import { useState } from 'react';
import './chat.css';

export default function SendMessageForm({ sendMessage }) {
    const [message, setMessage] = useState('');
    return (
        <div className="send-message-form">
            <form
                onSubmit={e => {
                    e.preventDefault();
                    sendMessage(message);
                    setMessage('');
                }}>
                <input
                    type="text"
                    placeholder="Type your message..."
                    onChange={e => setMessage(e.target.value)}
                    value={message}
                />
                <button type="submit" disabled={!message}>Send</button>
            </form>
        </div>
    )
}
