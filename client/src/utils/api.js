import axios from 'axios';

// Use localhost for API calls
const API_URL = 'http://localhost:5000/api';

// Create axios instance with detailed logging
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for logging
api.interceptors.request.use(
  config => {
    console.log('API Request:', {
      url: config.url,
      method: config.method,
      data: config.data,
      headers: config.headers
    });
    return config;
  },
  error => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for logging
api.interceptors.response.use(
  response => {
    console.log('API Response:', {
      status: response.status,
      data: response.data
    });
    return response;
  },
  error => {
    console.error('API Response Error:', error);
    return Promise.reject(error);
  }
);

// Chat API calls
export const sendMessage = async (message, conversationId = null) => {
  try {
    console.log(`Sending message to ${API_URL}/chat/send:`, { message, conversationId });
    const response = await api.post('/chat/send', { message, conversationId });
    console.log('Message sent successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error sending message:', error);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    } else if (error.request) {
      console.error('No response received. Request:', error.request);
    } else {
      console.error('Error message:', error.message);
    }
    throw error;
  }
};

export const getConversations = async () => {
  try {
    console.log(`Fetching conversations from ${API_URL}/chat/conversations`);
    const response = await api.get('/chat/conversations');
    console.log('Conversations fetched successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching conversations:', error);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    } else if (error.request) {
      console.error('No response received. Request:', error.request);
    } else {
      console.error('Error message:', error.message);
    }
    throw error;
  }
};

export const getConversation = async (conversationId) => {
  try {
    console.log(`Fetching conversation ${conversationId} from ${API_URL}/chat/conversations/${conversationId}`);
    const response = await api.get(`/chat/conversations/${conversationId}`);
    console.log('Conversation fetched successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching conversation:', error);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    } else if (error.request) {
      console.error('No response received. Request:', error.request);
    } else {
      console.error('Error message:', error.message);
    }
    throw error;
  }
};

export const deleteConversation = async (conversationId) => {
  try {
    console.log(`Deleting conversation ${conversationId} from ${API_URL}/chat/conversations/${conversationId}`);
    const response = await api.delete(`/chat/conversations/${conversationId}`);
    console.log('Conversation deleted successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error deleting conversation:', error);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    } else if (error.request) {
      console.error('No response received. Request:', error.request);
    } else {
      console.error('Error message:', error.message);
    }
    throw error;
  }
};

export default api;
