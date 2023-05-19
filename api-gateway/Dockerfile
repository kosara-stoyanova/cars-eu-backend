FROM node:16

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run

EXPOSE 8080

CMD ["npm", "run", "start"]
