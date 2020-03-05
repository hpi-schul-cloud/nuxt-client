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

echo "DOCKERTAG" $DOCKERTAG
echo "GITSHA" $GIT_SHA

# write version file
# JS syntax is required so we can import it
echo "version.js OLD:"
cat ./version.js
printf "module.exports={sha:'%s',branch:'%s',message:'%s'}" $TRAVIS_COMMIT $TRAVIS_BRANCH $TRAVIS_COMMIT_MESSAGE > ./version.js
echo "version.js NEW:"
cat ./version.js

# ----------------
# SCRIPTS
# ----------------

dockerPush(){
	# $1: Project Name (client, storybook, vuepress)
	# $2: docker tag to use

	# Log in to the docker CLI
	echo "$MY_DOCKER_PASSWORD" | docker login -u "$DOCKER_ID" --password-stdin

	# Push Image
	docker push schulcloud/schulcloud-nuxt-$1:$2
}

# BUILD SCRIPTS

buildClient(){
	docker build \
		-t schulcloud/schulcloud-nuxt-client:$TRAVIS_BRANCH \
		-t schulcloud/schulcloud-nuxt-client:$DOCKERTAG \
		-t schulcloud/schulcloud-nuxt-client:$GIT_SHA \
		-f Dockerfile.client \
		../

	dockerPush "client" $TRAVIS_BRANCH
	dockerPush "client" $DOCKERTAG
	dockerPush "client" $GIT_SHA
}

buildStorybook(){
	docker build \
		-t schulcloud/schulcloud-nuxt-storybook:$DOCKERTAG \
		-t schulcloud/schulcloud-nuxt-storybook:$GIT_SHA \
		-f Dockerfile.storybook \
		../

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

source ./buildAndDeployFilter.sh
buildAndDeployFilter

bash ./decryptSecrets.sh

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
  echo "Nothing to build defined"
	exit 1
fi

exit 0
