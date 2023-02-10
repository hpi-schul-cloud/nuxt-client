# Getting Started

## Development Setup

> **Note:**
> Please don't use yarn !!! We decided to use npm across all of our repositories.

In order to run this client, you need to have the [legacy-client](https://github.com/hpi-schul-cloud/schulcloud-client) and [schulcloud-server](https://github.com/hpi-schul-cloud/schulcloud-server) set up and running. See the repositories for instructions.

Install the required dependencies:
```sh
npm ci
```

Start the development server:
```sh
npm run serve
```

By default the server will listen on the URL [http://localhost:4000](http://localhost:4000)

## Further commands

You can find all commands inside the [package.json](https://github.com/hpi-schul-cloud/nuxt-client/blob/main/package.json) under the `scripts` section.

### Unit Tests

```bash
# Run all (unit) tests
npm run test
```

### Lint

```bash
npm run lint
```
