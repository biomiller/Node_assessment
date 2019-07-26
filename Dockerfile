FROM node:10 as node

WORKDIR /image

COPY . .

RUN ["npm", "install"]

EXPOSE 5000

ENTRYPOINT ["node", "server.js"]