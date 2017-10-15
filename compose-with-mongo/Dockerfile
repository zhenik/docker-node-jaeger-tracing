FROM node:8
WORKDIR /app
COPY package.json /app
RUN npm install
COPY server.js /app
CMD node server.js
EXPOSE 1234