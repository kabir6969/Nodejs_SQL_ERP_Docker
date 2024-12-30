# Use Node.js image as base
FROM node:20

# Install nodemon globally
RUN npm install -g nodemon

# Set the working directory in the container
WORKDIR /backend/app

# Copy the package files to install dependencies
COPY package.json package-lock.json* ./

# Install application dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Expose the port the app will run on
EXPOSE 3000

# Change ownership of app directory to non-root user (for better security)
RUN chown -R node /backend/app

# Use non-root user (node) to run the app
USER node

# Set the command to start the application
CMD ["npm", "run", "dev"]   # Start the app using npm run dev