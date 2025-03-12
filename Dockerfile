# build stage
FROM docker.io/node:22 AS build-stage

WORKDIR /app

COPY package.json package-lock.json ./

# Write the .npmrc file only if the GitHub token is provided
# A token is always required to access GitHub's npm registry
RUN --mount=type=secret,id=github_token \
    if [ -f /run/secrets/GIT_AUTH_TOKEN ]; then \
        echo "//npm.pkg.github.com/:_authToken=$(cat /run/secrets/GIT_AUTH_TOKEN)" > ~/.npmrc; \
    fi && \
    npm ci --ignore-scripts && \
    rm -f ~/.npmrc

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
RUN mkdir /etc/nginx/templates
COPY config/docker/nginx.conf.template /etc/nginx/templates/default.conf.template
COPY --from=build-stage /app/dist /usr/share/nginx/html/frontend
# second index.html needed for the location /h5p/ in csp rules
COPY --from=build-stage /app/dist /usr/share/nginx/html/h5p

EXPOSE 4000
CMD ["nginx", "-g", "daemon off;"]
