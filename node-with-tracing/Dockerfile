FROM node:8
WORKDIR /app
COPY package.json /app
RUN npm install
COPY server4.js /app
COPY tracer.js /app
CMD node server4.js
EXPOSE 1234