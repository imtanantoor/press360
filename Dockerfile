FROM node:22-alpine

WORKDIR /app

COPY package*.json tsconfig.json ./

RUN yarn

COPY . .

EXPOSE 3000

CMD ["yarn", "start"]
