# Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install any dependencies
RUN npm install --force

# Copy the rest of the application code to the working directory
COPY . .

# Build the Next.js application for production
RUN npm run build

# Expose port 3000 for the application
EXPOSE 3000

# Start the application with "npm start"
CMD [ "npm", "start" ]
