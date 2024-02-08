import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useChat } from '../../context/ChatProvider';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
} from '@chatscope/chat-ui-kit-react';
import './ChatScope.css';

export default function Chatscope() {
  const { topic, level } = useChat();
  const [chatId, setChatId] = useState("");
  const [messages, setMessages] = useState([]);

  const initialMsg = async () => {
    const chatInstruction = {
      language: "Hebrew",
      scenario: topic,
      level: level,
    };
    try {
      const response = await axios.post(
        "http://3.253.244.247:8080/start_chat",
        chatInstruction
      );
      setChatId(response.data.chat_id);
      setMessages([
        {
          message: response.data.generated_text,
          sentTime: "just now",
          sender: "Chitchat",
          chatId: chatId,
        },
      ]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    initialMsg();
  }, [level, topic]); 

  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async (message) => {
    const newMessage = {
      message,
      direction: "outgoing",
      sender: "user",
      chatId: chatId,
    };

    const newMessages = [...messages, newMessage];

    setMessages(newMessages);
    setIsTyping(true);
    await handleGptMsg(newMessages[newMessages.length - 1]);
  };

  const handleGptMsg = async (messageObj) => {
    try {
      const response = await axios.post("http://3.253.244.247:8080/cont_chat", {
        chat_id: messageObj.chatId,
        message: messageObj.message,
      });
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          message: response.data.generated_text,
          sentTime: "just now",
          sender: "Chitchat",
          chatId: chatId,
        },
      ]);
      setIsTyping(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="chitchat-container">
      <MainContainer>
        <ChatContainer>
          <MessageList
            scrollBehavior="smooth"
            typingIndicator={isTyping ? <TypingIndicator /> : null}
          >
            {messages.map((message, i) => {
              return <Message key={i} model={message} />;
            })}
          </MessageList>
          <MessageInput
            placeholder="Keep practicing, type here..."
            onSend={handleSend}
          />
        </ChatContainer>
      </MainContainer>
    </div>
  );
}