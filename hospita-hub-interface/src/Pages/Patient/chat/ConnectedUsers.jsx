import React from 'react'
import './chat.css';

export default function ConnectedUsers({ users }) {
    return (
        <div className='user-list'>
            <h4>Connected Users ({users.length})</h4>
            {users.length === 0 ? (
                <div className="loading">No users connected</div>
            ) : (
                users.map((u, idx) => <h6 key={idx}>{u}</h6>)
            )}
        </div>
    )
}
