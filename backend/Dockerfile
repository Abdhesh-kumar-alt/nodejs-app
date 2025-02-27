# Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json before running npm install
# This helps leverage Docker's caching mechanism
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install 

# Copy the rest of the application files
COPY . .

# Expose the port the application runs on
EXPOSE 8000

# Command to run the application
CMD ["node", "index.js"]

