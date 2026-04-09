# Stage 1: Build stage
FROM node:20-alpine AS build-stage

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY bun.lock ./

# Install dependencies (using npm for compatibility in Docker)
RUN npm install

# Copy the rest of the application
COPY . .

# Build the application
RUN npm run build

# Stage 2: Production stage
FROM nginx:stable-alpine AS production-stage

# Copy the build output to Nginx
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Copy a basic nginx config to handle SPA routing if necessary
# RUN echo 'server { listen 80; location / { root /usr/share/nginx/html; index index.html; try_files $uri $uri/ /index.html; } }' > /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

# Optional: Development stage (used in docker-compose)
FROM node:20-alpine AS development-stage
WORKDIR /app
COPY package*.json ./
COPY bun.lock ./
RUN npm install
COPY . .
EXPOSE 8080
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
