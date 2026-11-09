
# ETAPA 1: Compilar la aplicación Angular
FROM node:22-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

# ETAPA 2: Servir Angular con Nginx
FROM nginx:alpine

COPY --from=build /app/dist/angular/browser/ /usr/share/nginx/html/

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
