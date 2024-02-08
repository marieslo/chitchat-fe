import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavigateBar from './components/NavigateBar/NavigateBar';
import AuthProvider from './context/AuthProvider';
import HomePage from './pages/HomePage/HomePage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import WelcomePage from './pages/WelcomePage/WelcomePage';
import ChatArchivePage from './pages/ChatArchivePage/ChatArchivePage';
import Header from './components/Header/Header'
import './App.css';

function App() {
  return (
    <>
      <AuthProvider>
        <Router>
          <NavigateBar />
          <Header />
          <Routes>
            <Route path="/" element={<WelcomePage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/chathistory" element={<ChatArchivePage />} />
          </Routes>
        </Router>
      </AuthProvider>
    </>
  );
}

export default App;