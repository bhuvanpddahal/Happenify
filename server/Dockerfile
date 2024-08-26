FROM node:20

WORKDIR /app/server

COPY package*.json .

RUN npm install

COPY . .

CMD [ "npm", "run", "dev" ]