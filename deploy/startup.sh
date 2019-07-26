#! /bin/bash

cd ..

if [ ! -d "/app/dist" ]
then
	yarn build:nuxt
fi

yarn start
