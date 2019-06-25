# Build & Deployment

You can build all projects at once in parallel using `yarn build`.

All Generated files can be fount at: `./dist/*`

[[toc]]

## Nuxt Client

```bash
yarn build:nuxt
```

Output Directory: `./dist/nuxt`

### Environment-Variables

| env-variable | default | info |
| --- | --- | --- |
| API_HOST | `http://localhost:3030` | URL to [schulcloud-server](https://github.com/schul-cloud/schulcloud-server) |
| SC_THEME | `default` | theme used, same as in [schulcloud-client](https://github.com/schul-cloud/schulcloud-client) |
| SC_TITLE | `HPI Schul-Cloud` |  |
| SC_SHORT_TITLE | `Schul-Cloud` |  |

## Storybook

```bash
yarn build:storybook
```

Output Directory: `./dist/storybook`

### Environment-Variables

| env-variable | default | info |
| ------------ | ------- | ---- |
|              |         |      |

## Vuepress Docs

```bash
yarn build:docs
```

Output Directory: `./dist/docs`

### Environment-Variables

| env-variable | default | info |
| --- | --- | --- |
| ALGOLIA_API_KEY | _undefined_ | only production is indexed ([docs](https://vuepress.vuejs.org/default-theme-config/#algolia-search)) |
| ALGOLIA_NAME | _undefined_ | only production is indexed ([docs](https://vuepress.vuejs.org/default-theme-config/#algolia-search)) |

## Deployment

We use Travis to auto build and deploy this project.

### Production Deployment

We are using docker for all our production deployments.

#### Environment-Variables

| env-variable | default | info |
| --- | --- | --- |
| DOCKER_ID | _undefined_ |  |
| DOCKERFILE_VERSION | `Dockerfile` | Defines the Dockerfile-name-prefix that gets used for the deployment. The `Dockerfile.fast` option just copies the build folder from the host into the container, where the normal `Dockerfile` will do all build steps. |
| encrypted_b7461320c5f4_iv | _undefined_ |  |
| encrypted_b7461320c5f4_key | _undefined_ |  |
| MY_DOCKER_PASSWORD | _undefined_ |  |

### Pull Deployment

We also have a script do deploy every pull request to an test system and comment the url on the pull request.

#### Environment-Variables

| env-variable | default | info |
| --- | --- | --- |
| SURGE_SUBDOMAIN | `nuxt.schul-cloud` | subdomain for the deployed systems `docs.${TRAVIS_PULL_REQUEST}.${SURGE_SUBDOMAIN}.surge.sh` |
| SURGE_LOGIN | _undefined_ | [Travis Docs](https://docs.travis-ci.com/user/deployment/surge/#environment-variables) |
| SURGE_TOKEN | _undefined_ | [Travis Docs](https://docs.travis-ci.com/user/deployment/surge/#environment-variables) |
| GITHUB_TOKEN | _undefined_ | Github Access Tokens can be generated [here](https://github.com/settings/tokens). The Token must have the permission `public_repo - Access public repositories`. We also have a [Bot Account](https://github.com/schul-cloud-bot) for that purpose. |
