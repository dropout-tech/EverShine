# Build stage
FROM node:20-slim AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Fix npm optional dependencies bug with rollup
# Remove package-lock.json and reinstall
RUN rm -f package-lock.json && \
    npm install && \
    npm install rollup --save-dev

# Copy all source files
# This ensures we don't miss any config files like tsconfig.app.json
COPY . .

# Vite bakes VITE_* into the browser bundle. Zeabur only forwards service
# env vars into `docker build` when they are declared as ARG. Without these,
# the client throws on startup and the site renders as a blank page.
ARG VITE_SUPABASE_URL
ARG VITE_SUPABASE_ANON_KEY
ARG VITE_CLAIM_PASSWORD
ARG VITE_TURNSTILE_SITE_KEY
ARG VITE_GA_ID
ARG VITE_FB_PIXEL_ID
ARG VITE_CLARITY_ID
ENV VITE_SUPABASE_URL=$VITE_SUPABASE_URL \
    VITE_SUPABASE_ANON_KEY=$VITE_SUPABASE_ANON_KEY \
    VITE_CLAIM_PASSWORD=$VITE_CLAIM_PASSWORD \
    VITE_TURNSTILE_SITE_KEY=$VITE_TURNSTILE_SITE_KEY \
    VITE_GA_ID=$VITE_GA_ID \
    VITE_FB_PIXEL_ID=$VITE_FB_PIXEL_ID \
    VITE_CLARITY_ID=$VITE_CLARITY_ID

# Build the application
RUN npm run build

# Verify build output
RUN ls -la dist/ && \
    ls -la dist/assets/ && \
    test -f dist/index.html && \
    echo "Build verified successfully!"

# Production stage
FROM node:20-slim

WORKDIR /app

# Copy package files for production dependencies
COPY package*.json ./

# Install only production dependencies
RUN npm install --production

# Copy built files from builder stage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/public ./public
COPY server.js seo-routes.js ./

# Verify files exist
RUN ls -la dist/ && \
    ls -la dist/index.html && \
    ls -la public/

# Set environment
ENV PORT=8080
ENV NODE_ENV=production

# Expose port
EXPOSE 8080

# Start the server
CMD ["node", "server.js"]
