import React, { useState } from 'react';
import { Modal, Nav, Button } from 'react-bootstrap';
import SignUpForm from './SignUpForm';
import LoginForm from './LoginForm';
import { useNavigate } from 'react-router-dom';
import './LoginSignUp.css';
import localforage from 'localforage';

export default function LoginSignUpModal({ show, onHide, onSignup, onLogin }) {
  const [isLoginPage, setIsLoginPage] = useState(true);
  const [isAdminLogin, setIsAdminLogin] = useState(false);
  const navigate = useNavigate();

  const handleTogglePage = () => {
    setIsLoginPage(!isLoginPage);
  };

  const handleCheckboxChange = () => {
    setIsAdminLogin(!isAdminLogin);
  };

  const handleSignup = async (userData) => {
    onSignup(userData);
    const users = (await localforage.getItem('users')) || [];
    users.push({ email: userData.email, password: userData.password });
    await localforage.setItem('users', users);
    await localforage.setItem('user', userData);
    onHide();
    navigate('/home');
  };

  const handleLogin = (userData) => {
    onLogin({ ...userData, isAdmin: isAdminLogin });
    localforage.setItem('user', JSON.stringify(userData));
    onHide();
    navigate('/home');
  };

  return (
    <Modal show={show} onHide={onHide} centered>
       <Modal.Header className="modal-header-custom d-flex justify-content-between align-items-center">
        <Nav className='modal-tabs'>
          <Nav.Item>
            <Nav.Link className='tab-login' active={isLoginPage} onClick={() => setIsLoginPage(true)}>
              Login
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link className='tab-signup' active={!isLoginPage} onClick={() => setIsLoginPage(false)}>
              Sign Up
            </Nav.Link>
          </Nav.Item>
        </Nav>
        <Button className='button-close' variant="secondary" onClick={onHide}>X</Button>
      </Modal.Header>
      <Modal.Body>
        {isLoginPage ? (
          <LoginForm onSubmit={handleLogin} closeModal={onHide}/>
        ) : (
          <SignUpForm onSubmit={handleSignup} closeModal={onHide}/>
        )}
      </Modal.Body>
    </Modal>
  );
}