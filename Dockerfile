FROM docker.io/node:16 as git

RUN mkdir /app && chown -R node:node /app
WORKDIR /app
COPY .git .
RUN echo "{\"sha\": \"$(git rev-parse HEAD)\", \"version\": \"$(git describe --tags --abbrev=0)\", \"commitDate\": \"$(git log -1 --format=%cd --date=format:'%Y-%m-%dT%H:%M:%SZ')\", \"birthdate\": \"$(date +%Y-%m-%dT%H:%M:%SZ)\"}" > /app/nuxtversion

FROM docker.io/node:16

ENV NUXT_TELEMETRY_DISABLED=1
ARG SC_THEME=default
ENV SC_THEME ${SC_THEME}
EXPOSE 4000

RUN mkdir /app && chown -R node:node /app
WORKDIR /app

COPY package.json package-lock.json nuxt.config.js babel.config.js aliases.config.js http-headers.config.js LICENSE.md tsconfig.template.js jsconfig.template.js variation.js .prettierrc.js vue-shim.d.ts /app/
USER node
RUN npm ci
COPY --chown=node:node locale /app/locale
COPY --chown=node:node src /app/src

ENV NODE_ENV=production
RUN ["npm", "run", "build:nuxt"]
COPY --from=git /app/nuxtversion /app/src/static/nuxtversion
COPY run.sh /app
CMD [ "./run.sh"]
