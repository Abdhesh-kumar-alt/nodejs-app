# Use official Node.js LTS version for stability
FROM node:18-alpine AS build

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first (to leverage Docker caching)
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Set environment variable to fix OpenSSL issue
ENV NODE_OPTIONS=--openssl-legacy-provider

# Build the React application
RUN npm run build

# Use Nginx for serving the built frontend
FROM nginx:stable-alpine AS production

# Set working directory
WORKDIR /usr/share/nginx/html

# Remove default Nginx static assets
RUN rm -rf ./*

# Copy built React app from the build stage
COPY --from=build /app/build ./

# Expose port 80
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]

