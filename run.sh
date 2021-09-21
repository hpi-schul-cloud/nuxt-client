#!/usr/bin/env bash

set -euxo pipefail

echo "{\"apiURL\" : \"${API_URL}\"}" > src/static/runtime.config.json
exec npm run start:nuxt
