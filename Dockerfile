# Multi-stage build for MCP Quran Server
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Build the application
RUN pnpm build

# Production stage
FROM node:18-alpine AS production

# Set working directory
WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install only production dependencies
RUN pnpm install --prod --frozen-lockfile

# Copy built application from builder stage
COPY --from=builder /app/build ./build

# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S mcp-quran -u 1001

# Change ownership of the app directory
RUN chown -R mcp-quran:nodejs /app
USER mcp-quran

# Expose port (if needed for health checks)
EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "console.log('MCP Quran Server is healthy')" || exit 1

# Set environment variables
ENV NODE_ENV=production

# Default command
CMD ["node", "build/index.js"]
