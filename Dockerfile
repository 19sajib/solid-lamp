FROM node:20.9.0 as production
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install npm@10.1.0 -g
RUN npm ci

COPY . .

RUN npm run build
RUN rm -rf ./src


RUN npm prune --production
ENV TZ Asia/Dhaka

 
CMD ["node", "dist/main"]