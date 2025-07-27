# Build the React app
FROM node:20 AS build
WORKDIR /app

# Copy package files first (note the trailing / for directory)
COPY frontend/package*.json ./  # Added trailing slash

RUN npm install

# Copy remaining frontend files
COPY frontend/ .

RUN npm run build

# Serve with Nginx
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY frontend/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
