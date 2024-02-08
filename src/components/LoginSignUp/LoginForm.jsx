import React, { useState } from 'react';
import { Form, Alert } from 'react-bootstrap';
import localforage from 'localforage';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './LoginSignUp.css';

export default function LoginForm({ onSubmit, closeModal }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('http://localhost:8000/login', {
        email,
        password
      });
  
      const userData = response.data;
      localforage.setItem('token', userData.token);
      localforage.setItem('id', userData.id);
      localforage.setItem('user', userData);
      
      closeModal();
      navigate('/home');
    } catch (error) {
      setShowAlert(true);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      {showAlert && (
        <Alert variant="danger">User not registered or incorrect password</Alert>
      )}

      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>

      <button className="switch-login-signup-btn" type="submit">
        Login
      </button>
    </Form>
  );
}