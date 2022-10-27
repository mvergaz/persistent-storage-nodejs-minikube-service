FROM node:16

WORKDIR /usr/src/app
RUN npm init -y

COPY ./src/index.js .

EXPOSE 8080
CMD [ "node", "." ]
