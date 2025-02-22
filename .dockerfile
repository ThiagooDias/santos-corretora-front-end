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

# Gera o build do React
RUN npm run build

# Instala um servidor leve para servir o frontend
RUN npm install -g serve 

# Comando para rodar o React
CMD ["serve", "-s", "build", "-l", "8080"]

# Define a porta que será usada
EXPOSE 8080