import React from 'react'
import { useState } from 'react';
import './chat.css';

export default function Lobby({ joinRoom }) {
    const [user, setUser] = useState();
    const [room, setRoom] = useState();

    return (
        <div className="lobby-container">
            <form className='lobby'
                onSubmit={e => {
                    e.preventDefault();
                    joinRoom(user, room);
                }} >
                <h2>Join Chat Room</h2>
                <div>
                    <input
                        placeholder="Enter your name"
                        onChange={e => setUser(e.target.value)}
                    />
                    <input
                        placeholder="Enter room name"
                        onChange={e => setRoom(e.target.value)}
                    />
                </div>
                <button type="submit" disabled={!user || !room}>Join Room</button>
            </form>
        </div>
    )
}
