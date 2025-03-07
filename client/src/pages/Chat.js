import React, { useState, useEffect } from 'react';
import ConversationList from '../components/ConversationList';
import ChatWindow from '../components/ChatWindow';
import { ChatProvider } from '../context/ChatContext';
import './Chat.css';

const Chat = () => {
  const [showSidebar, setShowSidebar] = useState(window.innerWidth > 768);
  
  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setShowSidebar(window.innerWidth > 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <ChatProvider>
      <div className={`chat-container ${showSidebar ? 'show-sidebar' : 'hide-sidebar'}`}>
        <ConversationList onSelectConversation={() => window.innerWidth <= 768 && setShowSidebar(false)} />
        <ChatWindow onMenuClick={toggleSidebar} />
      </div>
    </ChatProvider>
  );
};

export default Chat;
