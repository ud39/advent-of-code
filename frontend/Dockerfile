# stage 1 angular app

# Base image
FROM node:16-alpine as builder

# Set the working directory inside the container
WORKDIR /code

# Copy the rest of the application code
COPY . .
COPY package*.json ./

# Install dependencies
RUN npm install
RUN npm run build --prod


# stage 2 nginx
FROM nginx:alpine

COPY --from=builder /code/dist/frontend /usr/share/nginx/html

EXPOSE 80
