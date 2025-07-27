# Build the React app
FROM node:20 AS build
WORKDIR /app
# Copy only what's needed from frontend/
COPY frontend/package*.json .
RUN npm install
COPY frontend/ .
RUN npm run build

# Serve with Nginx
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY frontend/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
