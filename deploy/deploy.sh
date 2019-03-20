#! /bin/bash

# replace special characters in branch name for docker tag
export DOCKERTAG=$( echo $TRAVIS_BRANCH | tr -s "[:punct:]" "-" )
echo GITSHA $GIT_SHA

DOCKERFILE_VERSION=${DOCKERFILE_VERSION:="Dockerfile"}

# storybook doku bauen und deployen
function storybook {
	docker build -t schulcloud/schulcloud-nuxt-storybook:latest -t schulcloud/schulcloud-nuxt-storybook:$GIT_SHA -f $DOCKERFILE_VERSION.storybook ../
	docker push schulcloud/schulcloud-nuxt-storybook:$GIT_SHA
	docker push schulcloud/schulcloud-nuxt-storybook:latest

	eval "echo \"$( cat compose-storybook.dummy )\"" > docker-compose-nuxt-storybook.yml

	scp -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null -i travis_rsa docker-compose-nuxt-storybook.yml linux@test.schul-cloud.org:~
	ssh -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null -i travis_rsa linux@test.schul-cloud.org /usr/bin/docker stack deploy -c /home/linux/docker-compose-nuxt-storybook.yml test-schul-cloud
}

# client doku bauen und deployen
function nuxtclient {
	docker build -t schulcloud/schulcloud-nuxt-client:latest -t schulcloud/schulcloud-nuxt-client:$GIT_SHA -f $DOCKERFILE_VERSION.nuxt ../
	docker push schulcloud/schulcloud-nuxt-client:$GIT_SHA
	docker push schulcloud/schulcloud-nuxt-client:latest

	eval "echo \"$( cat compose-nuxt.dummy )\"" > docker-compose-nuxt-client.yml

	scp -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null -i travis_rsa docker-compose-nuxt-client.yml linux@test.schul-cloud.org:~
	ssh -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null -i travis_rsa linux@test.schul-cloud.org /usr/bin/docker stack deploy -c /home/linux/docker-compose-nuxt-client.yml test-schul-cloud
}

# vuepress doku bauen und deployen
function vuepress {
	docker build -t schulcloud/schulcloud-nuxt-vuepress:latest -t schulcloud/schulcloud-nuxt-vuepress:$GIT_SHA -f $DOCKERFILE_VERSION.vuepress ../
	docker push schulcloud/schulcloud-nuxt-vuepress:$GIT_SHA
	docker push schulcloud/schulcloud-nuxt-vuepress:latest

	eval "echo \"$( cat compose-vuepress.dummy )\"" > docker-compose-nuxt-vuepress.yml

	scp -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null -i travis_rsa docker-compose-nuxt-vuepress.yml linux@test.schul-cloud.org:~
	ssh -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null -i travis_rsa linux@test.schul-cloud.org /usr/bin/docker stack deploy -c /home/linux/docker-compose-nuxt-vuepress.yml test-schul-cloud
}

cd deploy

openssl aes-256-cbc -K $encrypted_b7461320c5f4_key -iv $encrypted_b7461320c5f4_iv -in travis_rsa.enc -out travis_rsa -d
chmod 600 travis_rsa

# Log in to the docker CLI
echo "$MY_DOCKER_PASSWORD" | docker login -u "$DOCKER_ID" --password-stdin

if [[ $DOCKERTAG == deploy-story* ]]
then
  storybook
elif [[ $DOCKERTAG == deploy-nuxt* ]]
then
  nuxtclient
elif [[ $DOCKERTAG == deploy-doc* ]]
then
  vuepress
elif [[ $DOCKERTAG == master ]]
then
  storybook
  nuxtclient
  vuepress
else
  echo "Branch will not be deployed"
fi

exit 0
