# Stage 1: Build the React app
FROM node:22-alpine AS builder

# Set the working directory
WORKDIR /app

# Copy only package.json and package-lock.json to leverage Docker caching
COPY package*.json ./

# Install dependencies
RUN yarn


# Copy the entire source code
COPY . .

# Copy environment file
COPY .env .env


# Build the app
RUN yarn build

# Stage 2: Serve the app using Nginx
FROM nginx:alpine

# Copy the React build from the builder stage
COPY --from=builder /app/build /usr/share/nginx/html

# Copy a custom Nginx configuration if needed
# COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80 for the application
EXPOSE 80

# Run Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
