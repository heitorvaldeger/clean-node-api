FROM node:21-alpine

WORKDIR /workspace/clean-node-api

COPY ./package.json .

RUN npm install --only=prod