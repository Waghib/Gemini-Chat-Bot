import { createContext, useContext, useState, useEffect } from 'react';
import { sendMessage, getConversations, getConversation, deleteConversation } from '../utils/api';

const ChatContext = createContext();

export const useChatContext = () => {
  return useContext(ChatContext);
};

export const ChatProvider = ({ children }) => {
  const [conversations, setConversations] = useState([]);
  const [currentConversation, setCurrentConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all conversations
  const fetchConversations = async () => {
    try {
      setLoading(true);
      const data = await getConversations();
      setConversations(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch conversations');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch a specific conversation
  const fetchConversation = async (conversationId) => {
    try {
      setLoading(true);
      const data = await getConversation(conversationId);
      setCurrentConversation(data);
      setMessages(data.messages);
      setError(null);
    } catch (err) {
      setError('Failed to fetch conversation');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Send a message
  const handleSendMessage = async (message) => {
    try {
      setLoading(true);
      const conversationId = currentConversation?._id;
      
      // Add the user message to the UI immediately
      const userMessage = {
        _id: Date.now().toString(),
        role: 'user',
        content: message,
        createdAt: new Date().toISOString(),
      };
      
      setMessages((prevMessages) => [...prevMessages, userMessage]);
      
      // Send to API
      const response = await sendMessage(message, conversationId);
      
      // Add AI response to messages
      const aiMessage = {
        _id: Date.now().toString() + '-ai',
        role: 'assistant',
        content: response.message,
        createdAt: new Date().toISOString(),
      };
      
      setMessages((prevMessages) => [...prevMessages, aiMessage]);
      
      // If this was a new conversation, update current conversation
      if (!conversationId) {
        setCurrentConversation({ _id: response.conversationId });
        await fetchConversations(); // Refresh conversations list
      }
      
      setError(null);
    } catch (err) {
      setError('Failed to send message');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Clear current conversation
  const startNewChat = () => {
    setCurrentConversation(null);
    setMessages([]);
  };

  // Delete a conversation
  const handleDeleteConversation = async (conversationId, event) => {
    // Stop the event from bubbling up to parent elements
    if (event) {
      event.stopPropagation();
    }
    
    try {
      setLoading(true);
      await deleteConversation(conversationId);
      
      // Remove the deleted conversation from the state
      setConversations(prevConversations => 
        prevConversations.filter(conv => conv._id !== conversationId)
      );
      
      // If the deleted conversation was the current one, clear it
      if (currentConversation && currentConversation._id === conversationId) {
        setCurrentConversation(null);
        setMessages([]);
      }
      
      setError(null);
    } catch (err) {
      setError('Failed to delete conversation');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Load conversations on component mount
  useEffect(() => {
    fetchConversations();
  }, []);

  const value = {
    conversations,
    currentConversation,
    messages,
    loading,
    error,
    fetchConversations,
    fetchConversation,
    handleSendMessage,
    startNewChat,
    handleDeleteConversation
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

export default ChatContext;
