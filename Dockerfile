# 1. Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies first (this will be cached if package.json hasn't changed)
COPY package*.json ./
RUN npm ci

# Copy source code and build (only runs if source code changes)
COPY . .
RUN npm run build

# Clean up dev dependencies
RUN npm ci --only=production

# 2. Production stage
FROM node:20-alpine AS production

# Add non-root user for security
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

WORKDIR /app

# Copy built assets from builder
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./

# Change ownership to non-root user
RUN chown -R appuser:appgroup /app

# Switch to non-root user
USER appuser

# Expose application port
EXPOSE 3000

# Start the application
CMD ["node", "dist/main"] 
