#TODO: need more optimization
FROM node:alpine
WORKDIR /usr/src/app
COPY package*.json ./
COPY . .
RUN yarn
RUN yarn migration:run
RUN yarn start