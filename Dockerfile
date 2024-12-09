FROM node:20

WORKDIR /app

# Copy only the package files first for efficient caching
COPY package*.json ./

# Install dependencies using npm ci
RUN npm ci

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Expose application ports
EXPOSE 3000

# Start the application
CMD ["npm", "run", "start"]
