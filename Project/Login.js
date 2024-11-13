import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Auth.css'; 

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
     
      const response = await axios.get('http://localhost:4000/users');
      const users = response.data;


      const user = users.find((u) => u.email === email && u.password === password);

      if (user) {
       
        localStorage.setItem('token', 'fake-token');
        navigate('/home');
      } else {
        setError('Invalid credentials, please try again.');
      }
    } catch (err) {
      setError('Error while connecting to the server.');
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      <p>Don't have an account? <span className="link" onClick={() => navigate('/register')}>Register</span></p>
    </div>
  );
};

export default Login;
