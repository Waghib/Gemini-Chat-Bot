# Gemini Chat Bot - Docker Setup

This README explains how to run the Gemini Chat Bot application using Docker.

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)
- A Gemini API key from Google

## Quick Start

1. Clone the repository:
   ```
   git clone <repository-url>
   cd Gemini-Chat-Bot
   ```

2. Set your Gemini API key in the docker-compose.yml file:
   ```yaml
   # In docker-compose.yml
   services:
     server:
       environment:
         - GEMINI_API_KEY=your_api_key_here
   ```

3. Build and start the containers:
   ```
   docker-compose up -d
   ```

4. Access the application:
   - Frontend: http://localhost (port 80)
   - Backend API: http://localhost:5000

## Services

The application consists of three Docker containers:

1. **MongoDB (gemini-mongo)**:
   - Database for storing chat history
   - Port: 27017
   - Data persisted in a Docker volume

2. **Backend (gemini-server)**:
   - Node.js Express server
   - Port: 5000
   - Connects to MongoDB and the Gemini API

3. **Frontend (gemini-client)**:
   - React application served via Nginx
   - Port: 80
   - Communicates with the backend API

## Useful Commands

- Build and start all services:
  ```
  docker-compose up -d
  ```

- View logs:
  ```
  docker-compose logs -f
  ```

- Stop all services:
  ```
  docker-compose down
  ```

- Rebuild containers after changes:
  ```
  docker-compose up -d --build
  ```

## Environment Variables

- `PORT`: Backend server port (default: 5000)
- `MONGODB_URI`: MongoDB connection string (default: mongodb://mongo:27017/gemini-chat)
- `GEMINI_API_KEY`: Your Google Gemini API key (required)

## Troubleshooting

- If you encounter issues with the MongoDB connection, ensure the mongo service is running:
  ```
  docker-compose ps
  ```

- Check logs for specific services:
  ```
  docker-compose logs mongo
  docker-compose logs server
  docker-compose logs client
  ```

- To reset the database, remove the volume:
  ```
  docker-compose down -v
  ``` 