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

# [OPS-1664] Enhance all branches with Tag latest

echo $( bash pwd)

VERSION="$(jq -r '.version' ./package.json )"
echo VERSION:"$VERSION"

if [[ "$TRAVIS_BRANCH" == "master" ]]
then
	export DOCKERTAG=master_v"$VERSION"_latest
	export DOCKERTAG_SHA=master_v"$VERSION"_"$GIT_SHA"
elif [[ "$TRAVIS_BRANCH" == "develop" ]]
then
	export DOCKERTAG="develop_latest"
	export DOCKERTAG_SHA="develop_$GIT_SHA"
elif [[ "$TRAVIS_BRANCH" =~ ^"release"* ]]
then
	export DOCKERTAG=release_v"$VERSION"_latest
	export DOCKERTAG_SHA=release_v"$VERSION"_$GIT_SHA
elif [[ "$TRAVIS_BRANCH" =~ ^hotfix\/[A-Z]+-[0-9]+-[a-zA-Z_]+$ ]]
then
	# extract JIRA_TICKET_ID from TRAVIS_BRANCH
	JIRA_TICKET_ID=${TRAVIS_BRANCH/#hotfix\//}
	JIRA_TICKET_TEAM=${JIRA_TICKET_ID/%-*/}
	JIRA_TICKET_ID=${JIRA_TICKET_ID/#$JIRA_TICKET_TEAM"-"/}
	JIRA_TICKET_ID=${JIRA_TICKET_ID/%-*/}
	JIRA_TICKET_ID="$JIRA_TICKET_TEAM"-"$JIRA_TICKET_ID"
	# export DOCKERTAG=naming convention feature-<Jira id>-latest
	export DOCKERTAG=hotfix_"${JIRA_TICKET_ID}"_latest
	export DOCKERTAG_SHA=hotfix_"${JIRA_TICKET_ID}"_"$GIT_SHA"
elif [[ "$TRAVIS_BRANCH" =~ ^feature\/[A-Z]+-[0-9]+-[a-zA-Z_]+$ ]]
then
	# extract JIRA_TICKET_ID from TRAVIS_BRANCH
	JIRA_TICKET_ID=${TRAVIS_BRANCH/#feature\//}
	JIRA_TICKET_TEAM=${JIRA_TICKET_ID/%-*/}
	JIRA_TICKET_ID=${JIRA_TICKET_ID/#$JIRA_TICKET_TEAM"-"/}
	JIRA_TICKET_ID=${JIRA_TICKET_ID/%-*/}
	JIRA_TICKET_ID="$JIRA_TICKET_TEAM"-"$JIRA_TICKET_ID"
	# export DOCKERTAG=naming convention feature-<Jira id>-latest
	export DOCKERTAG=feature_"${JIRA_TICKET_ID}"_latest
	export DOCKERTAG_SHA=feature_"${JIRA_TICKET_ID}"_"$GIT_SHA"
else
	# Check for naming convention <branch>/<JIRA-Ticket ID>-<Jira_Summary>
	# OPS-1664
	echo -e "Event detected. However, branch name pattern does not match requirements to build an push. Expected <branch>/<JIRA-Ticket ID>-<Jira_Summary> but got $TRAVIS_BRANCH"
	exit 0
fi

echo "DOCKERTAG" $DOCKERTAG
echo "DOCKERTAG_SHA" $DOCKERTAG_SHA
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

	docker push schulcloud/schulcloud-nuxt-$1:$3
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
		-t schulcloud/schulcloud-nuxt-vuepress:$DOCKERTAG_SHA \
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

# trigger sc-app-ci to deploy release to staging

if [[ "$TRAVIS_BRANCH" =~ ^"release"* ]]
then
	echo "deploy release to staging $TRAVIS_BRANCH with $VERSION."
	echo "deployment version is set as github secret GITHUB NEXT_RELEASE"
	echo "and checked in sc-app-deploy workflow Deploy_release_to_staging.yml"

	# mask DOT for payload
	VERSION=$( echo $VERSION | tr -s "[:punct:]" "-" )

	curl -X POST https://api.github.com/repos/hpi-schul-cloud/sc-app-ci/dispatches \
	-H 'Accept: application/vnd.github.everest-preview+json' \
	-u $GITHUB_TOKEN \
	--data '{"event_type": "Trigger_from_sc_nuxt", "client_payload": { "GIT_BRANCH": "'"$TRAVIS_BRANCH"'", "TRIGGER_REPOSITORY": "sc-nuxt", "VERSION": "'"$VERSION"'" }}'
fi

exit 0
