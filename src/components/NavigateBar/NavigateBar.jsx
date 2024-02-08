import React, { useState } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import LoginSignUpModal from '../LoginSignUp/LoginSignUpModal.jsx';
import './NavigateBar.css';
import { useAuth } from '../../context/AuthProvider.jsx';

export default function NavigateBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [modalShow, setModalShow] = useState(false);
  const { user, login, logout } = useAuth();

  const handleModalOpen = () => {
    setModalShow(true);
  };

  const handleLogin = (userData) => {
    login(userData);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isAdmin = user && user.isAdmin;

  const activeLinkStyle = {
    color: '#FF0000',
    fontWeight: 'bold',
  };

  return (
    <Navbar className="nav" expand="md">
      <Navbar.Toggle aria-controls="basic-navbar-nav" />

      <Navbar.Collapse id="basic-navbar-nav" className="justify-content-start">
        <Nav className="mr-auto">

          {/* {user && ( */}
            <>
              <NavLink
                to="/"
                className="nav-link"
                style={location.pathname === '/' ? activeLinkStyle : {}}
              >
                Topic selection
              </NavLink>
{/* 
              <NavLink
                to="/profile"
                className="nav-link"
                style={location.pathname === '/profile' ? activeLinkStyle : {}}
              >
                My Profile
              </NavLink>
              <NavLink
                to="/chathistory"
                className="nav-link"
                style={location.pathname === '/chathistory' ? activeLinkStyle : {}}
              >
                My chats
              </NavLink> */}
            </>
          {/* )} */}
        </Nav>
      </Navbar.Collapse>
      <Navbar.Collapse className="justify-content-end">
        {user ? (
          <>
            <span onClick={handleLogout} className="nav-link">
              Log Out
            </span>
          </>
        ) : (
          <span onClick={handleModalOpen} className="nav-link">
            Log In / Sign Up
          </span>
        )}
      </Navbar.Collapse>

      <LoginSignUpModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        onSignup={(userData) => {
          console.log('Signing up:', userData);
        }}
        onLogin={handleLogin}
      />
    </Navbar>
  );
}