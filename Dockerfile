FROM node:lts as builder
RUN mkdir /app
WORKDIR '/app'
COPY ./package.json ./
COPY ./package-lock.json ./
RUN npm ci
COPY . /app/
RUN npm run build:nuxt
CMD [ "/bin/sh", "./startup.sh"]
