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

dockerLogin(){
	# Log in to the docker CLI
	echo "login to dockerhub.."
	echo "$MY_DOCKER_PASSWORD" | docker login -u "$DOCKER_ID" --password-stdin
}

dockerPush(){
	# $1: Project Name (client, storybook, vuepress)
	# $2: DOCKERTAG
	# $3: DOCKERTAG_SHA

	dockerLogin

	# Push Images
	docker push schulcloud/schulcloud-nuxt-$1:$2
	echo "schulcloud/schulcloud-nuxt-$1:$2"

	docker push schulcloud/schulcloud-nuxt-$1:$2
	echo "schulcloud/schulcloud-nuxt-$1:$3"
}

dockerBuild(){
	# $1: Project Name (client, storybook, vuepress)
	# $2: DOCKERTAG
	# $3: DOCKERTAG_SHA
	dockerLogin

	docker build \
		-t schulcloud/schulcloud-nuxt-$1:$2 \
		-t schulcloud/schulcloud-nuxt-$1:$3 \
		-f Dockerfile.$1 \
		../
}

# BUILD SCRIPTS

buildClient(){
	SC_THEME_LIST=('default' 'brb' 'n21' 'open' 'thr' 'int')
	# write version file
	# JS syntax is required so we can import it
	printf "module.exports = {\n  sha: \`%s\`,\n  branch: \`%s\`,\n  message: \`%s\`\n}" $TRAVIS_COMMIT "${TRAVIS_BRANCH//\`/\\\`}" "${TRAVIS_COMMIT_MESSAGE//\`/\\\`}" > ../version.js

	cat ../version.js

	# backwards compability for old logic
	export SC_THEME='default'
	dockerBuild "client" $DOCKERTAG $DOCKERTAG_SHA
	dockerPush "client" $DOCKERTAG $DOCKERTAG_SHA

	# theme based repos
	for THEME in "${SC_THEME_LIST[@]}"
	do
		export SC_THEME="$THEME"
		dockerLogin

		docker build \
			-t schulcloud/schulcloud-nuxt-client-$THEME:$DOCKERTAG \
			-t schulcloud/schulcloud-nuxt-client-$THEME:$DOCKERTAG_SHA \
			-f Dockerfile.client \
			../
		dockerPush "client-"$THEME $DOCKERTAG $DOCKERTAG_SHA
	done
}

buildStorybook(){
	dockerBuild "storybook" $DOCKERTAG $DOCKERTAG_SHA
	dockerPush "storybook" $DOCKERTAG $DOCKERTAG_SHA
}

buildVuepress(){
	dockerLogin
	docker build \
		-t schulcloud/schulcloud-nuxt-vuepress:$DOCKERTAG \
		-t schulcloud/schulcloud-nuxt-vuepress:$GIT_SHA \
		-f Dockerfile.vuepress \
		--build-arg ALGOLIA_NAME \
		--build-arg ALGOLIA_API_KEY \
		../

	dockerPush "vuepress" $DOCKERTAG $DOCKERTAG_SHA
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
