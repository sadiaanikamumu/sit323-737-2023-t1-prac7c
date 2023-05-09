FROM node:alpine
WORKDIR /app
COPY . /app
RUN npm install
COPY server.js .
EXPOSE 8080
CMD [ "node", "server.js" ]