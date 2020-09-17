#! /bin/bash

# ----------------
# DECLERATIONS
# ----------------

set -e # fail with exit 1 on any error

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
echo "Branch" $TRAVIS_BRANCH

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
	# write version file
	# JS syntax is required so we can import it
	printf "module.exports = {\n  sha: \`%s\`,\n  branch: \`%s\`,\n  message: \`%s\`\n}" $TRAVIS_COMMIT "${TRAVIS_BRANCH//\`/\\\`}" "${TRAVIS_COMMIT_MESSAGE//\`/\\\`}" > ../version.js

	cat ../version.js

	docker build \
		-t schulcloud/schulcloud-nuxt-client:$DOCKERTAG \
		-t schulcloud/schulcloud-nuxt-client:$GIT_SHA \
		-f Dockerfile.client \
		../

	dockerPush "client" $DOCKERTAG
	dockerPush "client" $GIT_SHA

	# If branch is develop, add and push additional docker tags
	if [[ "$TRAVIS_BRANCH" = "develop" ]]
	then
		docker tag schulcloud/schulcloud-nuxt-client:$DOCKERTAG schulcloud/schulcloud-nuxt-client:develop_latest
		dockerPush "client" "develop_latest"
	fi
}

buildStorybook(){
	docker build \
		-t schulcloud/schulcloud-nuxt-storybook:$DOCKERTAG \
		-t schulcloud/schulcloud-nuxt-storybook:$GIT_SHA \
		-f Dockerfile.storybook \
		../

	dockerPush "storybook" $DOCKERTAG
	dockerPush "storybook" $GIT_SHA

	# If branch is develop, add and push additional docker tags
	if [[ "$TRAVIS_BRANCH" = "develop" ]]
	then
		docker tag schulcloud/schulcloud-nuxt-storybook:$DOCKERTAG schulcloud/schulcloud-nuxt-storybook:develop_latest
		dockerPush "storybook" "develop_latest"
	fi
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

	# If branch is develop, add and push additional docker tags
	if [[ "$TRAVIS_BRANCH" = "develop" ]]
	then
		docker tag schulcloud/schulcloud-nuxt-vuepress:$DOCKERTAG schulcloud/schulcloud-nuxt-vuepress:develop_latest
		dockerPush "vuepress" "develop_latest"
	fi
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
