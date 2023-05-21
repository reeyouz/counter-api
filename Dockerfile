FROM node:18.12.1-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE ${PORT}

CMD [ "npm", "run", "dev" ]
