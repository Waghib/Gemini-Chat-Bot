const axios = require('axios');
const Conversation = require('../models/conversationModel');
const Message = require('../models/messageModel');

// Send a message to Gemini API and save the conversation
const sendMessage = async (req, res) => {
  try {
    const { message, conversationId } = req.body;
    
    console.log('Received request body:', req.body);
    
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Get API key from environment variable
    const API_KEY = process.env.GEMINI_API_KEY;
    
    console.log('API_KEY exists:', !!API_KEY);
    if (!API_KEY) {
      return res.status(500).json({ error: 'Gemini API key is not configured' });
    }

    let conversation;
    
    // Find or create conversation
    if (conversationId) {
      conversation = await Conversation.findById(conversationId);
      if (!conversation) {
        return res.status(404).json({ error: 'Conversation not found' });
      }
    } else {
      // Create a new conversation
      conversation = await Conversation.create({
        title: message.slice(0, 30) + (message.length > 30 ? '...' : '')
      });
    }

    // Save user message
    const userMessage = await Message.create({
      conversationId: conversation._id,
      role: 'user',
      content: message
    });
    
    conversation.messages.push(userMessage._id);
    await conversation.save();

    console.log('Calling Gemini API with key:', API_KEY.substring(0, 5) + '...');
    
    try {
      // Call Gemini API with updated endpoint
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,
        {
          contents: [
            {
              parts: [
                {
                  text: message
                }
              ]
            }
          ],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 2048,
          }
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      console.log('Gemini API response status:', response.status);
      console.log('Gemini API response data structure:', JSON.stringify(Object.keys(response.data)));

      // Extract AI response from Gemini API
      console.log('Full Gemini API response:', JSON.stringify(response.data, null, 2));
      
      // The correct path to extract text from Gemini API response
      const aiResponseText = response.data.candidates[0].content.parts[0].text;
      console.log('AI response text extracted successfully:', aiResponseText);

      // Save AI response
      const aiMessage = await Message.create({
        conversationId: conversation._id,
        role: 'assistant',
        content: aiResponseText
      });
      
      conversation.messages.push(aiMessage._id);
      await conversation.save();

      // Return response
      return res.status(200).json({
        conversationId: conversation._id,
        message: aiResponseText
      });
    } catch (apiError) {
      console.error('Error calling Gemini API:', apiError);
      
      if (apiError.response) {
        console.error('API Response status:', apiError.response.status);
        console.error('API Response data:', JSON.stringify(apiError.response.data, null, 2));
      } else if (apiError.request) {
        console.error('No response received from API. Request:', apiError.request);
      } else {
        console.error('API Error message:', apiError.message);
      }
      
      throw apiError; // Re-throw to be caught by the outer catch block
    }
  } catch (error) {
    console.error('Error in sendMessage:', error);
    
    // Add more detailed error handling
    if (error.response) {
      console.error('Response error status:', error.response.status);
      console.error('Response error data:', JSON.stringify(error.response.data, null, 2));
    }
    
    return res.status(500).json({ 
      error: 'Failed to process message',
      details: error.message,
      responseData: error.response ? error.response.data : null
    });
  }
};

// Get all conversations
const getConversations = async (req, res) => {
  try {
    const conversations = await Conversation.find()
      .sort({ updatedAt: -1 })
      .select('title updatedAt');
    
    return res.status(200).json(conversations);
  } catch (error) {
    console.error('Error in getConversations:', error);
    return res.status(500).json({ 
      error: 'Failed to fetch conversations',
      details: error.message 
    });
  }
};

// Get a specific conversation with messages
const getConversation = async (req, res) => {
  try {
    const { id } = req.params;
    
    const conversation = await Conversation.findById(id)
      .populate({
        path: 'messages',
        select: 'role content createdAt'
      });
    
    if (!conversation) {
      return res.status(404).json({ error: 'Conversation not found' });
    }
    
    return res.status(200).json(conversation);
  } catch (error) {
    console.error('Error in getConversation:', error);
    return res.status(500).json({ 
      error: 'Failed to fetch conversation',
      details: error.message 
    });
  }
};

// Delete a specific conversation and its messages
const deleteConversation = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Find the conversation
    const conversation = await Conversation.findById(id);
    
    if (!conversation) {
      return res.status(404).json({ error: 'Conversation not found' });
    }
    
    // Delete all messages associated with this conversation
    await Message.deleteMany({ conversationId: id });
    
    // Delete the conversation
    await Conversation.findByIdAndDelete(id);
    
    return res.status(200).json({ 
      message: 'Conversation deleted successfully',
      deletedId: id
    });
  } catch (error) {
    console.error('Error in deleteConversation:', error);
    return res.status(500).json({ 
      error: 'Failed to delete conversation',
      details: error.message 
    });
  }
};

module.exports = {
  sendMessage,
  getConversations,
  getConversation,
  deleteConversation
};
