
import React, { useState } from 'react';
import axios from 'axios';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const res = await axios.post('/api/auth/login', { username, password });
    localStorage.setItem('token', res.data.token);
    window.location.href = '/dashboard';
  };

  return (
    <div className="p-8">
      <h1>Login</h1>
      <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default LoginPage;
