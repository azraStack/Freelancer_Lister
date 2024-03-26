FROM node:16.17.0-bullseye-slim

WORKDIR /app

COPY package*.json ./


RUN npm install

COPY . .
RUN npx prisma generate
RUN npx prisma migrate


CMD ["npm","run","start"]