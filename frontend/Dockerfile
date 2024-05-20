FROM node:20.10.0

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN  npm run build
RUN  npm install -g serve

EXPOSE 3000

CMD ['serve']