# build stage
FROM docker.io/node:18-bullseye as build-stage

## add libraries needed for installing canvas npm package
RUN apt update && apt install -y g++ libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev;

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY babel.config.js .eslintrc.js LICENSE.md tsconfig.json tsconfig.build.json vue.config.js ./
COPY public ./public
COPY src ./src
COPY webpack-config ./webpack-config
ARG SC_THEME=default
ENV SC_THEME ${SC_THEME}
RUN NODE_ENV=production npm run build

COPY .git ./
RUN echo "{\"sha\": \"$(git rev-parse HEAD)\", \"version\": \"$(git describe --tags --abbrev=0)\", \"commitDate\": \"$(git log -1 --format=%cd --date=format:'%Y-%m-%dT%H:%M:%SZ')\", \"birthdate\": \"$(date +%Y-%m-%dT%H:%M:%SZ)\"}" > ./dist/nuxtversion

# run stage
FROM docker.io/nginx:1.23
RUN mkdir /etc/nginx/templates
COPY dockerconf/nginx.conf.template /etc/nginx/templates/default.conf.template
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 4000
CMD ["nginx", "-g", "daemon off;"]