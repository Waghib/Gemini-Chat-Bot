const express = require('express');
const router = express.Router();
const { sendMessage, getConversations, getConversation, deleteConversation } = require('../controllers/chatController');

// Send a message to Gemini API
router.post('/send', sendMessage);

// Get all conversations for a user
router.get('/conversations', getConversations);

// Get a specific conversation
router.get('/conversations/:id', getConversation);

// Delete a specific conversation
router.delete('/conversations/:id', deleteConversation);

module.exports = router;
