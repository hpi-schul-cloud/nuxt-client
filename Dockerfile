# build stage
FROM docker.io/node:22 AS build-stage

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --ignore-scripts

COPY babel.config.js eslint.config.js LICENSE.md .prettierrc.js tsconfig.json tsconfig.build.json .prettierignore ./
COPY lib/eslint-plugin-schulcloud ./lib/eslint-plugin-schulcloud
COPY public ./public
COPY src ./src
COPY config/webpack ./config/webpack
ARG SC_THEME=default
ENV SC_THEME=${SC_THEME}
RUN NODE_ENV=production npm run build

COPY .git ./.git
RUN echo "{\"sha\": \"$(git rev-parse HEAD)\", \"version\": \"$(git describe --tags --abbrev=0)\", \"commitDate\": \"$(git log -1 --format=%cd --date=format:'%Y-%m-%dT%H:%M:%SZ')\", \"birthdate\": \"$(date +%Y-%m-%dT%H:%M:%SZ)\"}" > ./dist/nuxtversion
RUN if [ -f "public/themes/${SC_THEME}/bbb/presentation.pdf" ]; then \
      cp "public/themes/${SC_THEME}/bbb/presentation.pdf" ./dist/bbb-presentation.pdf; \
    else \
      echo "File public/themes/${SC_THEME}/bbb/presentation.pdf does not exist, skipping."; \
    fi

# run stage
FROM docker.io/nginx:1.27
ENV NGINX_LOG_FORMAT main
RUN mkdir /etc/nginx/templates
COPY config/docker/nginx.conf.template /etc/nginx/templates/default.conf.template
COPY --from=build-stage /app/dist /usr/share/nginx/html/frontend
# second index.html needed for the location /h5p/ in csp rules
COPY --from=build-stage /app/dist /usr/share/nginx/html/h5p

EXPOSE 4000
CMD ["nginx", "-g", "daemon off;"]
