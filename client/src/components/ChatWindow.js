import React, { useRef, useEffect } from 'react';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import { useChatContext } from '../context/ChatContext';
import './ChatWindow.css';

const ChatWindow = ({ onMenuClick }) => {
  const { messages, handleSendMessage, loading, currentConversation } = useChatContext();
  const messagesEndRef = useRef(null);

  // Auto-scroll to the bottom when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="chat-window">
      <div className="chat-header">
        <div className="header-left">
          <button className="menu-button" onClick={onMenuClick} aria-label="Toggle menu">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path fillRule="evenodd" d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z" clipRule="evenodd" />
            </svg>
          </button>
          <h1>Gemini AI Chat</h1>
        </div>
        {currentConversation && (
          <div className="chat-title">
            {currentConversation.title}
          </div>
        )}
      </div>
      
      <div className="messages-container">
        {messages.length === 0 ? (
          <div className="empty-chat">
            <div className="welcome-message">
              <h2>Welcome to Gemini AI Chat!</h2>
              <p>Ask me anything and I'll do my best to help you.</p>
            </div>
          </div>
        ) : (
          messages.map((message, index) => (
            <ChatMessage key={message._id || index} message={message} />
          ))
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <ChatInput onSendMessage={handleSendMessage} isLoading={loading} />
    </div>
  );
};

export default ChatWindow;
