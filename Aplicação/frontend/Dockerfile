# Estágio 1: Build da aplicação (Node)
FROM node:22-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
# Utilizando o Vite, o comando padrão de build é esse:
RUN npm run build

# Estágio 2: Servidor Web de Produção (Nginx)
FROM nginx:alpine
# Copia os arquivos compilados do React para a pasta pública do Nginx
COPY --from=build /app/dist /usr/share/nginx/html
# Configuração para o React Router funcionar corretamente no Nginx
RUN echo 'server { \
    listen 80; \
    location / { \
        root /usr/share/nginx/html; \
        index index.html index.htm; \
        try_files $uri $uri/ /index.html; \
    } \
}' > /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]