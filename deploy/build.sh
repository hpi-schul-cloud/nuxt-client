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

# If branch is feature rewrite docker tag
if [[ "$TRAVIS_BRANCH" = feature* ]]
then
	# extract JIRA_TICKET_ID from TRAVIS_BRANCH
	JIRA_TICKET_ID=${TRAVIS_BRANCH/#feature\//}
	JIRA_TICKET_TEAM=${JIRA_TICKET_ID/%-*/}
	JIRA_TICKET_ID=${JIRA_TICKET_ID/#$JIRA_TICKET_TEAM"-"/}
	JIRA_TICKET_ID=${JIRA_TICKET_ID/%-*/}
	JIRA_TICKET_ID=$( echo $JIRA_TICKET_TEAM | tr -s "[:upper:]" "[:lower:]" )"-"$JIRA_TICKET_ID
	# export DOCKERTAG=naming convention feature-<Jira id>-latest
	export DOCKERTAG=$( echo "feature-"$JIRA_TICKET_ID"-latest")
fi

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

	# If branch is develop, add and push additional docker tags
	if [[ "$TRAVIS_BRANCH" = "develop" ]]
	then
		docker tag schulcloud/schulcloud-nuxt-client:$DOCKERTAG schulcloud/schulcloud-nuxt-client:develop_latest
		dockerPush "client" "develop_latest"
	elif [[ "$TRAVIS_BRANCH" = feature* ]]
	# If branch is feature, add and push additional docker tags
	then
		dockerPush schulcloud/schulcloud-nuxt-client:$DOCKERTAG
		dockerPush schulcloud/schulcloud-nuxt-client:$GIT_SHA
	else
		dockerPush "client" $DOCKERTAG
		dockerPush "client" $GIT_SHA
	fi
}

buildStorybook(){
	docker build \
		-t schulcloud/schulcloud-nuxt-storybook:$DOCKERTAG \
		-t schulcloud/schulcloud-nuxt-storybook:$GIT_SHA \
		-f Dockerfile.storybook \
		../

	# If branch is develop, add and push additional docker tags
	if [[ "$TRAVIS_BRANCH" = "develop" ]]
	then
		docker tag schulcloud/schulcloud-nuxt-storybook:$DOCKERTAG schulcloud/schulcloud-nuxt-storybook:develop_latest
		dockerPush "storybook" "develop_latest"
	elif [[ "$TRAVIS_BRANCH" = feature* ]]
	# If branch is feature, add and push additional docker tags
	then
		dockerPush schulcloud/schulcloud-nuxt-storybook:$DOCKERTAG
		dockerPush schulcloud/schulcloud-nuxt-storybook:$GIT_SHA
	else
		dockerPush "storybook" $DOCKERTAG
		dockerPush "storybook" $GIT_SHA
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

	# If branch is develop, add and push additional docker tags
	if [[ "$TRAVIS_BRANCH" = "develop" ]]
	then
		docker tag schulcloud/schulcloud-nuxt-vuepress:$DOCKERTAG schulcloud/schulcloud-nuxt-vuepress:develop_latest
		dockerPush "vuepress" "develop_latest"
	# If branch is feature, add and push additional docker tags
	elif [[ "$TRAVIS_BRANCH" = feature* ]]
	then
		dockerPush schulcloud/schulcloud-nuxt-vuepress:$DOCKERTAG
		dockerPush schulcloud/schulcloud-nuxt-vuepress:$GIT_SHA
	else
		dockerPush "vuepress" $DOCKERTAG
		dockerPush "vuepress" $GIT_SHA
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
