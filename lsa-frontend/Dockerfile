# Use a lightweight Node.js image as the base
FROM node:14-alpine as build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application files
COPY . .

# Copy the .okta.env file to the working directory
COPY .okta.env .env

# Load environment variables from the .env file
ARG env_file=.env
RUN set -a && source $env_file && set +a

# Build the application
RUN npm run build

# Use Nginx as the production server
FROM nginx

# Copy the built files to Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Copy the Nginx configuration file
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the service worker file
COPY src/registerServiceWorker.js /app/build/service-worker.js

# Expose the desired port (default is 80)
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
