# Stage 1: Build Angular app
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install --legacy-peer-deps

COPY . .
RUN npm run build:prod

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Elimina la config por defecto de Nginx
RUN rm /etc/nginx/conf.d/default.conf

# Copia nuestra configuración personalizada
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copia los archivos compilados de Angular
COPY --from=builder /app/dist/task-manager-frontend/browser /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
