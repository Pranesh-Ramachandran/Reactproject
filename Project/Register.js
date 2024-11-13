import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Auth.css'; 

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

   
    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    try {
    
      const response = await axios.post('http://localhost:4000/users', {
        email,
        password
      });

     
      if (response.status === 201) {
        navigate('/'); 
      }
    } catch (err) {
      setError('Registration failed, please try again.');
    }
  };

  return (
    <div className="auth-container">
      <h2>Register</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleRegister}>
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
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit">Register</button>
      </form>
      <p>Already have an account? <span className="link" onClick={() => navigate('/')}>Login</span></p>
    </div>
  );
};

export default Register;
