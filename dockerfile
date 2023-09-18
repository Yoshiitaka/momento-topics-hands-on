FROM node:18 AS builder
WORKDIR /usr/src/app
COPY . /usr/src/app

RUN npm install
RUN npm run build

RUN npm install -g next
EXPOSE 3000
CMD ["npm", "run", "start"]