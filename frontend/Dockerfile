# Use an official Node.js image as a base
FROM node:18-alpine

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the entire frontend code
COPY . .

# Build the React app
RUN npm run build

# Install a simple HTTP server for serving static files
RUN npm install -g serve

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application
# CMD ["serve", "-s", "build", "-l", "3000"]
CMD ["npm", "start"]
