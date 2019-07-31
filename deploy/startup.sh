#! /bin/bash

if [ ! -d "/app/dist" ]
then
	yarn build:nuxt
fi

yarn start
