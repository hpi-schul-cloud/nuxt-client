# build stage
FROM docker.io/node:20 AS build-stage

## add libraries needed for installing canvas npm package
RUN apt update && apt install -y g++ libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev;

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY babel.config.js .eslintrc.js LICENSE.md .prettierrc.js tsconfig.json tsconfig.build.json .eslintignore .prettierignore ./
COPY public ./public
COPY src ./src
COPY config/webpack ./config/webpack
ARG SC_THEME=default
ENV SC_THEME ${SC_THEME}
RUN NODE_ENV=production npm run build

# we need to copy the public/content folder after the build step, because the build step will add the web component files to the public folder
COPY public/content ./public/content

COPY .git ./.git
RUN echo "{\"sha\": \"$(git rev-parse HEAD)\", \"version\": \"$(git describe --tags --abbrev=0)\", \"commitDate\": \"$(git log -1 --format=%cd --date=format:'%Y-%m-%dT%H:%M:%SZ')\", \"birthdate\": \"$(date +%Y-%m-%dT%H:%M:%SZ)\"}" > ./dist/nuxtversion

# run stage
FROM docker.io/nginx:1.27
RUN mkdir /etc/nginx/templates
COPY config/docker/nginx.conf.template /etc/nginx/templates/default.conf.template
COPY --from=build-stage /app/dist /usr/share/nginx/html/frontend
# second index.html needed for the location /h5p/ in csp rules
COPY --from=build-stage /app/dist /usr/share/nginx/html/h5p

EXPOSE 4000
CMD ["nginx", "-g", "daemon off;"]
