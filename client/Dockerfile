FROM node:20

WORKDIR /app/client

COPY package*.json .

RUN npm install

COPY . .

ENTRYPOINT [ "npm", "run", "start" ]