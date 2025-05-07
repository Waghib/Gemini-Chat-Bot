FROM node:18-alpine as build

WORKDIR /app

COPY package*.json ./

RUN npm install

# Copy source code but exclude node_modules
COPY . .

RUN npm run build

FROM nginx:alpine

COPY --from=build /app/build /usr/share/nginx/html

# Add config for SPA routing
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"] 