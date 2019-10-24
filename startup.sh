#! /bin/bash

if [ ! -d "/dist/nuxt" ]
then
	npm run build:nuxt
fi

npm run start
