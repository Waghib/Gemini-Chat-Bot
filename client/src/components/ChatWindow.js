import React, { useRef, useEffect } from 'react';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import { useChatContext } from '../context/ChatContext';
import './ChatWindow.css';

const ChatWindow = () => {
  const { messages, handleSendMessage, loading, currentConversation } = useChatContext();
  const messagesEndRef = useRef(null);

  // Auto-scroll to the bottom when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="chat-window">
      <div className="chat-header">
        <h1>Gemini AI Chat</h1>
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
      
      <ChatInput onSendMessage={handleSendMessage} loading={loading} />
    </div>
  );
};

export default ChatWindow;
