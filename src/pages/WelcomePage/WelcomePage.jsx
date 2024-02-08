import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './WelcomePage.css';
import { useChat } from '../../context/ChatProvider';

export default function WelcomePage() {
  const { setTopic, setLevel } = useChat();
  const navigate = useNavigate();
  const [level, setLevelState] = useState('');

  const handleRedirectHome = () => {
    navigate('/home');
  };

  const handleLevelChange = (level) => {
    setLevel(level);
    setLevelState(level); 
  };

  const handleThemeSelect = (topic) => {
    setTopic(topic);
    handleRedirectHome();
  };

  return (
    <>
      <div className="welcome-page">
        <div className="level-container">
          <h3>Choose Language Level:</h3>
          <div className="radio-buttons">
            <label htmlFor="beginner">  
              Beginner </label>
              <input
                id="beginner"
                type="radio"
                value="Beginner"
                checked={level === 'Beginner'} 
                onChange={() => handleLevelChange('Beginner')}
              />
        
            <label htmlFor="intermediate">    
              Intermediate     </label>
              <input
                id="intermediate"
                type="radio"
                value="Intermediate"
                checked={level === 'Intermediate'} 
                onChange={() => handleLevelChange('Intermediate')}
              />
       
            <label htmlFor="advanced">
              Advanced </label>
              <input
                id="advanced"
                type="radio"
                value="Advanced"
                checked={level === 'Advanced'} 
                onChange={() => handleLevelChange('Advanced')}
              />
           
          </div>
        </div>

        <div className="theme-container">
          <h3>Choose Conversation Theme:</h3>
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
    </>
  );
}