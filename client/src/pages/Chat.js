import React from 'react';
import ConversationList from '../components/ConversationList';
import ChatWindow from '../components/ChatWindow';
import { ChatProvider } from '../context/ChatContext';
import './Chat.css';

const Chat = () => {
  return (
    <ChatProvider>
      <div className="chat-container">
        <ConversationList />
        <ChatWindow />
      </div>
    </ChatProvider>
  );
};

export default Chat;
