# Usa uma imagem do Node.js leve
FROM node:18-alpine 

# Define o diretório de trabalho
WORKDIR /app

# Copia os arquivos do projeto
COPY package*.json ./

# Instala as dependências
RUN npm install 

# Copia o resto dos arquivos
COPY . .

# Aceita variáveis de ambiente no build
ARG REACT_APP_API_URL
ARG REACT_APP_API_KEY_MAPS

# Define as variáveis para o build do React
ENV REACT_APP_API_URL=$REACT_APP_API_URL
ENV REACT_APP_API_KEY_MAPS=$REACT_APP_API_KEY_MAPS

# Gera o build do React
RUN npm run build

# Instala um servidor leve para servir o frontend
RUN npm install -g serve 

# Comando para rodar o React
CMD ["serve", "-s", "build", "-l", "8080"]

# Define a porta que será usada
EXPOSE 8080
