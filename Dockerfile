# Multi-stage build for MERN E-Commerce App

# Stage 1: Build React Client
FROM node:18-alpine AS client-build
WORKDIR /app/client
COPY client/package*.json ./
RUN npm ci
COPY client/ ./
RUN npm run build

# Stage 2: Setup Server
FROM node:18-alpine AS server
WORKDIR /app

# Copy server files
COPY server/package*.json ./
RUN npm ci --only=production

COPY server/ ./

# Copy built client from previous stage
COPY --from=client-build /app/client/build ./public

# Expose port
EXPOSE 5000

# Set environment to production
ENV NODE_ENV=production

# Start the server
CMD ["node", "server.js"]
