# Gemini Chat Application

A chat application using React for the frontend, Node.js for the backend, and MongoDB for storing conversation history. The application uses Google's Gemini API for generating responses.

## Features

- Modern, responsive UI similar to ChatGPT
- Conversation history storage and retrieval
- Real-time chat with Google's Gemini API
- Create and switch between different conversations

## Prerequisites

- Node.js and npm
- MongoDB (local or Atlas cloud instance)
- Google Gemini API key

## Setup Instructions

### Backend Setup

1. Navigate to the server directory:
   ```
   cd gemini-chat-app/server
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the server directory with the following variables:
   ```
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   GEMINI_API_KEY=your_gemini_api_key
   ```

4. Start the server:
   ```
   npm run dev
   ```

### Frontend Setup

1. Navigate to the client directory:
   ```
   cd gemini-chat-app/client
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Install additional required packages:
   ```
   npm install axios react-router-dom
   ```

4. Start the React development server:
   ```
   npm start
   ```

5. Open your browser and go to `http://localhost:3000` to use the application.

## How to Get a Gemini API Key

1. Go to [Google AI Studio](https://aistudio.google.com/)
2. Create an account or sign in
3. Navigate to API keys section
4. Create a new API key
5. Copy the API key and paste it in your `.env` file

## Project Structure

- `/client` - React frontend
  - `/src/components` - UI components
  - `/src/context` - React context for state management
  - `/src/pages` - Main application pages
  - `/src/utils` - Utility functions and API calls

- `/server` - Node.js backend
  - `/controllers` - Request handlers
  - `/models` - MongoDB schemas
  - `/routes` - API routes
  - `index.js` - Main entry point

## License

MIT
