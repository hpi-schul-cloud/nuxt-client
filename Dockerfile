# build stage
FROM docker.io/node:18-bullseye as build-stage

#  add libraries needed for installing canvas npm package
RUN apt update && apt install -y g++ libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev;

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY ./ .
ARG SC_THEME=default
ENV SC_THEME ${SC_THEME}
RUN npm run vue:build

# run stage
FROM docker.io/nginx:1.23
COPY dockerconf/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 4000
CMD ["nginx", "-g", "daemon off;"]