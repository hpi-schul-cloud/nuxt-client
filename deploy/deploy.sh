#! /bin/bash

# ----------------
# DECLERATIONS
# ----------------

while getopts p: option
do
case "${option}"
in
p) PROJECT=${OPTARG};;
esac
done
echo PROJECT $PROJECT


# replace special characters in branch name for docker tag
export DOCKERTAG=$( echo $TRAVIS_BRANCH | tr -s "[:punct:]" "-" )
echo GITSHA $GIT_SHA

# ----------------
# SCRIPTS
# ----------------

decryptSecrets(){
	echo "decrypt secrets"

	openssl aes-256-cbc -K $encrypted_b7461320c5f4_key -iv $encrypted_b7461320c5f4_iv -in travis_rsa.enc -out travis_rsa -d
	chmod 600 travis_rsa
}

deploy(){
	# $1: Project Name (client, storybook, vuepress)
	echo "deploy" $1 "..."

	eval "echo \"$( cat compose-$1.dummy )\"" > docker-compose-nuxt-$1.yml

	# scp -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null -i travis_rsa docker-compose-nuxt-$1.yml linux@test.schul-cloud.org:~
	# ssh -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null -i travis_rsa linux@test.schul-cloud.org /usr/bin/docker stack deploy -c /home/linux/docker-compose-nuxt-$1.yml test-schul-cloud
	ssh -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null -i travis_rsa linux@test.schul-cloud.org /usr/bin/docker service update --force --image docker-compose-nuxt-$1:$DOCKERTAG
}

dockerPush(){
	# $1: Project Name (client, storybook, vuepress)
	# $2: docker tag to use

	# Log in to the docker CLI
	echo "$MY_DOCKER_PASSWORD" | docker login -u "$DOCKER_ID" --password-stdin

	docker push schulcloud/schulcloud-nuxt-$1:$2
}

# BUILD SCRIPTS

buildClient(){
	docker build \
		-t schulcloud/schulcloud-nuxt-client:$DOCKERTAG \
		-t schulcloud/schulcloud-nuxt-client:$GIT_SHA \
		-f Dockerfile.client \
		../

	dockerPush "client" $DOCKERTAG
	dockerPush "client" $GIT_SHA
}

buildStorybook(){
	docker build \
		-t schulcloud/schulcloud-nuxt-storybook:$DOCKERTAG \
		-t schulcloud/schulcloud-nuxt-storybook:$GIT_SHA \
		-f Dockerfile.storybook \
		../

	dockerPush "storybook" "latest"
	dockerPush "storybook" $DOCKERTAG
	dockerPush "storybook" $GIT_SHA
}

buildVuepress(){
	docker build \
		-t schulcloud/schulcloud-nuxt-vuepress:$DOCKERTAG \
		-t schulcloud/schulcloud-nuxt-vuepress:$GIT_SHA \
		-f Dockerfile.vuepress \
		--build-arg ALGOLIA_NAME \
		--build-arg ALGOLIA_API_KEY \
		../

	dockerPush "vuepress" $DOCKERTAG
	dockerPush "vuepress" $GIT_SHA
}

# ----------------
# MAIN SCRIPT
# ----------------
cd deploy

decryptSecrets

if [[ $PROJECT == "client" ]]
then
	buildClient
elif [[ $PROJECT == "storybook" ]]
then
	buildStorybook
elif [[ $PROJECT == "vuepress" ]]
then
	buildVuepress
else
  echo "Nothing to deploy"
	exit 1
fi

deploy $PROJECT

exit 0
