# Use official Node.js image as base
FROM node:latest

# Set working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose port 3000 (or whatever port your application is running on)
EXPOSE 3000

# Command to run the application
CMD ["npm", "start"]

