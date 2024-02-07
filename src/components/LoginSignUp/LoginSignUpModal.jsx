import React, { useState } from 'react';
import { Modal, Nav, Tab, Form } from 'react-bootstrap';
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
    localStorage.setItem('user', JSON.stringify(userData));
    onHide();
    navigate('/home');
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Tab.Container activeKey={isLoginPage ? 'login' : 'signup'}>
        <Modal.Header closeButton>
          <Nav className='modal-tabs'>
            <Nav.Item>
              <Nav.Link className='tab-login' eventKey="login" onClick={handleTogglePage}>
                Login
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link className='tab-signup' eventKey="signup" onClick={handleTogglePage}>
                Sign Up
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Modal.Header>
        <Modal.Body>
          <Tab.Content>
            <Tab.Pane eventKey="login">
              <LoginForm onSubmit={handleLogin} />
              <Form.Group controlId="isAdminCheckbox" className="checkbox-label">
                <Form.Check
                  className='checkbox-input'
                  type="checkbox"
                  label="I'm admin"
                  checked={isAdminLogin}
                  onChange={handleCheckboxChange}
                />
                <div className="checkbox-checkmark"></div>
              </Form.Group>
            </Tab.Pane>
            <Tab.Pane eventKey="signup">
              <SignUpForm onSubmit={handleSignup} />
            </Tab.Pane>
          </Tab.Content>
        </Modal.Body>
      </Tab.Container>
    </Modal>
  );
}
