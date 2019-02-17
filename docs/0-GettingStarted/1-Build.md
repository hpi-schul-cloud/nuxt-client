# Build & Deployment

You can build all projects at once in parallel using `yarn build`.

All Generated files can be fount at: `./dist/*`

[[toc]]

## Nuxt Client

```bash
$ yarn build:nuxt
```

Output Directory: `./dist/nuxt`

### NODE_ENV during build

| node-env       | default                 | info                                                                                         |
| -------------- | ----------------------- | -------------------------------------------------------------------------------------------- |
| API_HOST       | `http://localhost:3030` | URL to [schulcloud-server](https://github.com/schul-cloud/schulcloud-server)                 |
| SC_THEME       | `default`               | theme used, same as in [schulcloud-client](https://github.com/schul-cloud/schulcloud-client) |
| SC_TITLE       | `HPI Schul-Cloud`       |                                                                                              |
| SC_SHORT_TITLE | `Schul-Cloud`           |                                                                                              |

## Storybook

```bash
$ yarn build:storybook
```

Output Directory: `./dist/storybook`

## Vuepress Docs

```bash
$ yarn build:docs
```

Output Directory: `./dist/docs`
