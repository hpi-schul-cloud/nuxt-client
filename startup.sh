#! /bin/bash

if [ ! -d "/app/dist" ]
then
	npm run build:legacy
	npm run build:nuxt
fi

npm run start
