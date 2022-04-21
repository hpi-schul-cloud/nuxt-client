<!-- markdownlint-disable MD037 -->

# Build & Deployment

You can build all projects at once in parallel using `npm run build`.

All Generated files can be fount at: `./dist/*`

[[toc]]

## Nuxt Client

```bash
npm run build:nuxt
npm run start:nuxt
```

Output Directory: `dist/nuxt`

### Environment-Variables (runtime)

| env-variable | default | info |
| --- | --- | --- |
| NODE_ENV | _undefined_ | Possible Values: `development`, `production` |
| HOST | `localhost` | HOST where the project should be served |
| PORT | `4000` | PORT where the project should be served |
| API_URL | `http://localhost:3030` | URL to [schulcloud-server](https://github.com/hpi-schul-cloud/schulcloud-server) |
| LEGACY_CLIENT_URL | `http://localhost:3100` | URL to proxy legacy requests to. Required unless `FALLBACK_DISABLED=true`. |
| SC_THEME | `default` | Each theme has a seperate folder. See [theming](../2-Styles/3-Theming.md) for more details. |
| FALLBACK_DISABLED | `false` | disables the legacy client and serves only vue pages. |
| PROXY_LOG_LEVEL | `silent` | Loglevel of the legacy proxy. Allowed values: `debug`, `info`, `warn`, `error`, `silent` |
| FEATURE_TEAMS_ENABLED | `false` | Enables Teams feature in sidebar |
| FEATURE_EXTENSIONS_ENABLED | `false` | Enables Add-Ons in sidebar. Just for N21! |
| JWT_SHOW_TIMEOUT_WARNING_SECONDS | `3600` | from this remaining time on the autologout warning is displayed to the user |
| JWT_TIMEOUT_SECONDS | `7200` | Time a inactivity user's sessions remains active |
| FEATURE_LERNSTORE_ENABLED | `true` | Enable edusharing lern-store |
| FEATURE_MATRIX_MESSENGER_ENABLED | `false` | If enabled, adds support for matrix messenger |
| FEATURE_MESSENGER_SCHOOL_SETTINGS_VISIBLE | `false` | Only if enabled, school admins can activate the messenger in their school setting. |
| FEATURE_MESSENGER_SCHOOL_ROOM_ENABLED | `false` | If enabled, school admins can choose to create a room for all students and teachers of the school. |
| MATRIX_MESSENGER_EMBED_URI | _undefined_ | Where to find the messenger dependencies. |
| MATRIX_MESSENGER_HOMESERVER_URI | _undefined_ | Where to find the messenger server. |
| LEGACY_COURSE_OVERVIEW_ENABLED | `false` | Enables legacy Course link. |
| ALERT_STATUS_URL | `https://status.dbildungscloud.de` | URL to status page. |
| ROOM_VIEW_ENABLED | `false` | Enables room view. |

### Environment-Variables

| env-variable | default | info |
| ------------ | ------- | ---- |
|              |         |      |

## Vuepress Docs

```bash
npm run build:docs
```

Output Directory: `./dist/docs`

### Environment-Variables (buildtime)

| env-variable | default | info |
| --- | --- | --- |
| ALGOLIA_API_KEY | _undefined_ | only production is indexed ([docs](https://vuepress.vuejs.org/default-theme-config/#algolia-search)) |
| ALGOLIA_NAME | _undefined_ | only production is indexed ([docs](https://vuepress.vuejs.org/default-theme-config/#algolia-search)) |

## Deployment

We use Travis to auto build and deploy this project.

### Production Deployment

We are using docker for all our production deployments.

#### Environment-Variables

| env-variable       | default     | info                             |
| ------------------ | ----------- | -------------------------------- |
| DOCKER_ID          | _undefined_ | used for docker CLI login        |
| MY_DOCKER_PASSWORD | _undefined_ | used for docker CLI login        |
| encrypted\_\*\_iv  | _undefined_ | `used to decrypt travis_rsa.enc` |
| encrypted\_\*\_key | _undefined_ | `used to decrypt travis_rsa.enc` |

### Pull Deployment

We also have a script do deploy every pull request to an test system and comment the url on the pull request.

#### Environment-Variables

| env-variable | default | info |
| --- | --- | --- |
| SURGE_SUBDOMAIN | `nuxt.schul-cloud` | subdomain for the deployed systems `docs.${TRAVIS_PULL_REQUEST}.${SURGE_SUBDOMAIN}.surge.sh` |
| SURGE_LOGIN | _undefined_ | [Travis Docs](https://docs.travis-ci.com/user/deployment/surge/#environment-variables) |
| SURGE_TOKEN | _undefined_ | [Travis Docs](https://docs.travis-ci.com/user/deployment/surge/#environment-variables) |
| GITHUB_TOKEN | _undefined_ | Github Access Tokens can be generated [here](https://github.com/settings/tokens). The Token must have the permission `public_repo - Access public repositories`. We also have a [Bot Account](https://github.com/hpi-schul-cloud-bot) for that purpose. |
