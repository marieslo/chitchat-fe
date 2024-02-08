import React, { createContext, useState, useContext } from 'react';

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [topic, setTopic] = useState('');
  const [level, setLevel] = useState('');

  return (
    <ChatContext.Provider value={{ topic, setTopic, level, setLevel }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);