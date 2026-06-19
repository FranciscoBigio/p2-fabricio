FROM node:18-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
# Apenas para expor a porta configurada
EXPOSE 3000
# Comando de inicialização do container
CMD ["npm", "start"]