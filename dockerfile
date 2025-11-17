FROM node:18

WORKDIR /app

# Copiar arquivos de dependências
COPY package*.json ./

RUN npm install

# Copiar o restante dos arquivos
COPY . .

# Garantir que o arquivo .env seja carregado corretamente
RUN npm install dotenv && echo "require('dotenv').config();" > .env

# Rodar o comando prisma generate para garantir que o cliente Prisma seja gerado
RUN npx prisma generate

# Compilar o código TypeScript para JavaScript
RUN npm run build

CMD ["npm", "run", "start:prod"]
