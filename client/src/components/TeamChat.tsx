
import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000');

function TeamChat() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    socket.on('receiveMessage', (msg) => {
      setMessages((prev) => [...prev, msg]);
    });
  }, []);

  const sendMessage = () => {
    socket.emit('sendMessage', message);
    setMessages([...messages, message]);
    setMessage('');
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Team Chat</h2>
      <div className="border p-2 h-40 overflow-auto">
        {messages.map((msg, index) => (
          <div key={index} className="p-1">{msg}</div>
        ))}
      </div>
      <input className="border p-1" value={message} onChange={(e) => setMessage(e.target.value)} />
      <button onClick={sendMessage} className="ml-2 p-1 bg-blue-500 text-white">Send</button>
    </div>
  );
}

export default TeamChat;
