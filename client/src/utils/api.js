import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Chat API calls
export const sendMessage = async (message, conversationId = null) => {
  try {
    const response = await api.post('/chat/send', { message, conversationId });
    return response.data;
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
};

export const getConversations = async () => {
  try {
    const response = await api.get('/chat/conversations');
    return response.data;
  } catch (error) {
    console.error('Error fetching conversations:', error);
    throw error;
  }
};

export const getConversation = async (conversationId) => {
  try {
    const response = await api.get(`/chat/conversations/${conversationId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching conversation:', error);
    throw error;
  }
};

export const deleteConversation = async (conversationId) => {
  try {
    const response = await api.delete(`/chat/conversations/${conversationId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting conversation:', error);
    throw error;
  }
};

export default api;
