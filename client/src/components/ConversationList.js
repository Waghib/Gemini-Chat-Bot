import React from 'react';
import { useChatContext } from '../context/ChatContext';
import './ConversationList.css';

const ConversationList = () => {
  const { 
    conversations, 
    currentConversation, 
    fetchConversation, 
    startNewChat, 
    loading,
    handleDeleteConversation
  } = useChatContext();

  const handleSelectConversation = (conversationId) => {
    fetchConversation(conversationId);
  };

  return (
    <div className="conversation-list">
      <div className="conversation-list-header">
        <h2>Conversations</h2>
        <button 
          className="new-chat-btn" 
          onClick={startNewChat}
        >
          New Chat
        </button>
      </div>
      
      <div className="conversation-items">
        {loading && conversations.length === 0 ? (
          <div className="loading-conversations">Loading conversations...</div>
        ) : conversations.length === 0 ? (
          <div className="no-conversations">No conversations yet. Start a new chat!</div>
        ) : (
          conversations.map((conversation) => (
            <div
              key={conversation._id}
              className={`conversation-item ${
                currentConversation?._id === conversation._id ? 'active' : ''
              }`}
            >
              <div 
                className="conversation-content"
                onClick={() => handleSelectConversation(conversation._id)}
              >
                <div className="conversation-title">{conversation.title}</div>
                <div className="conversation-date">
                  {new Date(conversation.updatedAt).toLocaleDateString()}
                </div>
              </div>
              <button 
                className="delete-conversation-btn"
                onClick={(e) => handleDeleteConversation(conversation._id, e)}
                title="Delete conversation"
              >
                <span>×</span>
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ConversationList;
