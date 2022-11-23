#!/bin/sh
set -e

if [ "$1" = "nginx" ]; then
  echo "{\"apiURL\" : \"${API_URL}\"}" > /usr/share/nginx/html/runtime.config.json
fi

exec "$@"
