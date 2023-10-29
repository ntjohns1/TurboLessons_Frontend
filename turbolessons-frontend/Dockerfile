# Use a lightweight Node.js image as the base
FROM node:14-alpine as build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application files
COPY ./ /app/

# Load environment variables from the .env file
ARG ISSUER
ARG CLIENT_ID
ENV REACT_APP_ISSUER=$ISSUER
ENV REACT_APP_CLIENT_ID=$CLIENT_ID

# Build the application
RUN npm run build

# Use Nginx as the production server
FROM nginx
RUN rm /etc/nginx/nginx.conf /etc/nginx/conf.d/default.conf

# Copy the built files to Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Copy the Nginx configuration file
COPY nginx.conf /etc/nginx/nginx.conf

# Expose the desired port (default is 80)
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
