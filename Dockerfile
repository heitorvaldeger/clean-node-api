FROM node:21-alpine

WORKDIR /workspace/clean-node-api

COPY ./package.json .

RUN npm install --only=prod

COPY ./dist ./dist

EXPOSE 5050

CMD npm start