FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Create .env file if doesn't exist (will be overridden by environment variables)
RUN touch .env

EXPOSE 5000

CMD ["npm", "start"] 