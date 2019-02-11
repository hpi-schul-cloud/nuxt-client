FROM node:lts

WORKDIR '/app' 
COPY ./package.json ./
RUN yarn install
COPY . .
RUN git submodule init && git submodule update && cd schulcloud-client && npm install && cd ..

EXPOSE 3000

CMD bash

