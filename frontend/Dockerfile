FROM node:16.15.1-alpine

RUN mkdir /app

WORKDIR /app

COPY package.json /app
COPY package-lock.json /app

RUN npm install
COPY ./ /app

ENTRYPOINT ["npm", "run", "dev"]
