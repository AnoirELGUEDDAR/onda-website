# Build the React app
FROM node:20 AS build
WORKDIR /app

# Copy package files individually (more reliable)
COPY frontend/package.json .
COPY frontend/package-lock.json .
RUN npm install

# Copy remaining files
COPY frontend/ .
RUN npm run build

# Serve with Nginx
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY frontend/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
