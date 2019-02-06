# Build

## Developing

### with SSR

```bash
# build for production and launch server
$ yarn run build
$ yarn start
```

### as SPA

```bash
# generate static project
$ yarn run generate
```

### NODE_ENV during build

| node-env | default                                        | info                                                                               |
| -------- | ---------------------------------------------- | ---------------------------------------------------------------------------------- |
| API_HOST | [http://localhost:3030](http://localhost:3030) | URL to [schulcloud-server](https://github.com/schul-cloud/schulcloud-server)       |
| SC_THEME | default                                        | theme used for [legacy fallback](https://github.com/schul-cloud/schulcloud-client) |
