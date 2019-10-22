#! /bin/bash

if [ ! -d "/dist" ]
then
	npm run build:nuxt
fi

npm run start
