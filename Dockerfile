# Use the official Node.js image as the base image
FROM node:lts

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the files
COPY . .

# Build the React app

CMD ["npm", "run", "build"]
