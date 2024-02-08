import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './WelcomePage.css';

export default function WelcomePage() {
  const [selectedLevel, setSelectedLevel] = useState('');
  const [selectedTheme, setSelectedTheme] = useState('');
  const navigate = useNavigate();

  const handleRedirectHome = () => {
    navigate('/home');
  };


  const handleLevelChange = (level) => {
    setSelectedLevel(level);
  };

  const handleThemeSelect = (theme) => {
    setSelectedTheme(theme);
  };

  return (
    <div className="welcome-page">
      <div className="level-container">
        <h2>Choose Language Level:</h2>
        <div className="radio-buttons">
          <label>
            Beginner
            <input
              type="radio"
              value="Beginner"
              checked={selectedLevel === 'Beginner'}
              onChange={() => handleLevelChange('Beginner')}
            />
          </label>
          <label>
            Intermediate
            <input
              type="radio"
              value="Intermediate"
              checked={selectedLevel === 'Intermediate'}
              onChange={() => handleLevelChange('Intermediate')}
            />
          </label>
          <label>
            Advanced
            <input
              type="radio"
              value="Advanced"
              checked={selectedLevel === 'Advanced'}
              onChange={() => handleLevelChange('Advanced')}
            />
          </label>
        </div>
      </div>

      <div className="theme-container">
        <h2>Choose Conversation Theme:</h2>
        <div className="theme-buttons">
          <button className="theme-button" onClick={() => handleThemeSelect('Going on Vacation')}>Going on Vacation</button>
          <button className="theme-button" onClick={() => handleThemeSelect('Ordering at a Restaurant')}>Ordering at a Restaurant</button>
          <button className="theme-button" onClick={() => handleThemeSelect('Buying Clothes at a Store')}>Buying Clothes at a Store</button>
          <button className="theme-button" onClick={() => handleThemeSelect('Catching up with an Old Friend')}>Catching up with an Old Friend</button>
        </div>
      </div>

      <div className="bottom-container">
        <button className="redirect-button" onClick={handleRedirectHome}>
          My own topic
        </button>
      </div>
    </div>
  );
}