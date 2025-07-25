# Build the React app
FROM node:18 AS build
WORKDIR /app
COPY . .
RUN npm install && npm run build

# Serve it with Nginx
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html

# Copy custom Nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
