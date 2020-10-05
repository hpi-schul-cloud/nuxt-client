#! /bin/bash

# ----------------
# DECLERATIONS
# ----------------

set -e # fail with exit 1 on any error

trap 'catch $? $LINENO' EXIT
catch() {
  if [ "$1" != "0" ]; then
    echo "An issue occured in line $2. Status code: $1"
  fi

  # Cleanup
  rm -f travis_rsa
}

while getopts p: option
do
case "${option}"
in
p) PROJECT=${OPTARG};;
esac
done

# ----------------
# SCRIPTS
# ----------------

inform_live() {
	# $1: Project Name (client, storybook, vuepress)
  if [[ "$TRAVIS_EVENT_TYPE" != "cron" ]]
  then
  curl -X POST -H 'Content-Type: application/json' --data '{"text":":rocket: Die Produktivsysteme können aktualisiert werden: HPI Schul-Cloud Nuxt-'$1'! Dockertag: '$DOCKERTAG'"}' $WEBHOOK_URL_CHAT
  fi
}

inform_staging() {
  if [[ "$TRAVIS_EVENT_TYPE" != "cron" ]]
  then
    curl -X POST -H 'Content-Type: application/json' --data '{"text":":boom: Das Staging-System wurde aktualisiert: HPI Schul-Cloud Nuxt-Client! https://staging.schul-cloud.org/nuxtversion (Dockertag: '$DOCKERTAG')"}' $WEBHOOK_URL_CHAT
  fi
}

inform_hotfix() {
  if [[ "$TRAVIS_EVENT_TYPE" != "cron" ]]
  then
    curl -X POST -H 'Content-Type: application/json' --data '{"text":":boom: Das Hotfix-'$1'-System wurde aktualisiert: HPI Schul-Cloud Nuxt-Client! https://hotfix'$1'.schul-cloud.dev/nuxtversion (Dockertag: '$DOCKERTAG')"}' $WEBHOOK_URL_CHAT
  fi
}

deploy(){
	SYSTEM=$1 # [staging, test, demo]

	DOCKER_IMAGE=$2 # (nuxt-client, nuxt-storybook, nuxt-vuepress), autoprefixed with "schulcloud-"
	DOCKER_TAG=$3 # version/tag of the image to use. Usually the branch name or a GIT_SHA
	DOCKER_SERVICE_NAME=$4 # docker service name on server

	COMPOSE_SRC=$5 # name of the docker-compose file which should be used as.
	COMPOSE_TARGET=$6 # name as which the compose file should be pushed to the server (auto prefixed with "docker-compose-")
	STACK_NAME=$7 # swarm stack name
	TLD=${8:-org}  # If variable not set or null, set it to default.

	echo "deploy " $DOCKER_IMAGE ":" $DOCKER_TAG " to " $SYSTEM " as " $DOCKER_SERVICE_NAME
	echo "COMPOSEFILE: " $COMPOSE_SRC " => " $COMPOSE_TARGET

	# generate new compose file
	eval "echo \"$( cat $COMPOSE_SRC )\"" > docker-compose-$COMPOSE_TARGET

	# info: we don't need the two lines for deployment because they use the false docker-compose file and overwrites the config which created by devops, this results from the fact that the wrong csp configuration is used and the environment variables are missing if they are not explicitly included in the template. (pr 1158)

	# deploy new compose file
	# scp -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null -i travis_rsa docker-compose-$COMPOSE_TARGET linux@$SYSTEM.schul-cloud.org:~
	# ssh -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null -i travis_rsa linux@$SYSTEM.schul-cloud.org /usr/bin/docker stack deploy -c /home/linux/docker-compose-$COMPOSE_TARGET $STACK_NAME

	# deploy new dockerfile
	echo "Attempting to update Docker service $DOCKER_SERVICE_NAME..."
	ssh -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null -i travis_rsa travis@$SYSTEM.schul-cloud.$TLD schulcloud/schulcloud-$DOCKER_IMAGE:$DOCKER_TAG $DOCKER_SERVICE_NAME
}

# ----------------
# MAIN SCRIPT
# ----------------
cd deploy

source ./buildAndDeployFilter.sh
buildAndDeployFilter

bash ./decryptSecrets.sh

echo "PROJECT" $PROJECT
echo "DOCKERTAG" $DOCKERTAG

if [ -z "$PROJECT" ] || [ -z "$DOCKERTAG" ];
then
	echo "PROJECT parameter or DOCKERTAG env is missing. Abort deployment."
	exit 1;
fi


case "$TRAVIS_BRANCH" in

	master)
		# If an event occurs on branch master call inform without deployment
		echo "Event detected on branch master. Informing team. No deployment on master."
		inform_live $PROJECT
		;;

	develop)
		# If an event occurs on branch develop deploy to test
		echo "Event detected on branch develop. Attempting to deploy to development (test) environment..."
		case "$PROJECT" in
			client)
				# deploy $SYSTEM $DOCKERFILE $DOCKERTAG $DOCKER_SERVICENAME $COMPOSE_DUMMY $COMPOSE_FILE $COMPOSE_SERVICENAME
				# ops-1109: Deployment now in sc-app-ci
				# deploy "test" "nuxt-client" $DOCKERTAG "test-schul-cloud_nuxtclient" "compose-client_default.dummy" "nuxt-client.yml" "test-schul-cloud"
			;;
			storybook)
				deploy "test" "nuxt-storybook" $DOCKERTAG "test-schul-cloud_storybook" "compose-storybook.dummy" "nuxt-storybook.yml" "test-schul-cloud"
			;;
			vuepress)
				deploy "test" "nuxt-vuepress" $DOCKERTAG "test-schul-cloud_vuepress" "compose-vuepress.dummy" "nuxt-vuepress.yml" "test-schul-cloud"
			;;
			*)
				echo "$PROJECT does not match one of \"client\", \"storybook\" or \"vuepress\". Deployment will be skipped."
			;;
		esac
		;;
	release*)
		# If an event occurs on branch release* deploy to staging
		echo "Event detected on branch release*. Attempting to deploy to staging environment..."
		case "$PROJECT" in
			client)
				# TODO deploy with themes
				deploy "staging" "nuxt-client" $DOCKERTAG "staging_nuxtclient" "compose-client_default.dummy" "nuxt-client_default.yml" "staging"
				# deploy "staging" "nuxt-client" $DOCKERTAG "staging-schul-cloud_nuxtclient" "compose-client_brb.dummy" "nuxt-client_brb.yml" "staging-schul-cloud"
				# deploy "staging" "nuxt-client" $DOCKERTAG "staging-schul-cloud_nuxtclient" "compose-client_n21.dummy" "nuxt-client_n21.yml" "staging-schul-cloud"
				# deploy "staging" "nuxt-client" $DOCKERTAG "staging-schul-cloud_nuxtclient" "compose-client_open.dummy" "nuxt-client_open.yml" "staging-schul-cloud"
				# deploy "staging" "nuxt-client" $DOCKERTAG "staging-schul-cloud_nuxtclient" "compose-client_thr.dummy" "nuxt-client_thr.yml" "staging-schul-cloud"
				# deploy "staging" "nuxt-client" $DOCKERTAG "staging-schul-cloud_nuxtclient" "compose-client_int.dummy" "nuxt-client_int.yml" "staging-schul-cloud"
			;;
			storybook)
				deploy "staging" "nuxt-storybook" $DOCKERTAG "staging_storybook" "compose-storybook.dummy" "nuxt-storybook.yml" "staging"
			;;
			vuepress)
				deploy "staging" "nuxt-vuepress" $DOCKERTAG "staging_vuepress" "compose-vuepress.dummy" "nuxt-vuepress.yml" "staging"
			;;
			*)
				echo "$PROJECT does not match one of \"client\", \"storybook\" or \"vuepress\". Deployment will be skipped."
			;;
		esac
		;;
	hotfix*)
		# If an event occurs on branch hotfix* parse team id 
		# and deploy to according hotfix environment
		TEAM="$(cut -d'/' -f2 <<< $TRAVIS_BRANCH)"
		if [[ "$TEAM" -gt 0 && "$TEAM" -lt 8 ]]; then
			echo "Event detected on branch hotfix/$TEAM/... . Attempting to deploy to hotfix environment $TEAM, project $PROJECT..."
			inform_hotfix $TEAM
			case "$PROJECT" in
				client)
					# TODO deploy with themes
					deploy "hotfix${TEAM}" "nuxt-client" $DOCKERTAG "hotfix${TEAM}_nuxtclient" "compose-client_default.dummy" "nuxt-client_default.yml" "hotfix${TEAM}_nuxtclient" "dev"
					# deploy "staging" "nuxt-client" $DOCKERTAG "staging-schul-cloud_nuxtclient" "compose-client_brb.dummy" "nuxt-client_brb.yml" "staging-schul-cloud"
					# deploy "staging" "nuxt-client" $DOCKERTAG "staging-schul-cloud_nuxtclient" "compose-client_n21.dummy" "nuxt-client_n21.yml" "staging-schul-cloud"
					# deploy "staging" "nuxt-client" $DOCKERTAG "staging-schul-cloud_nuxtclient" "compose-client_open.dummy" "nuxt-client_open.yml" "staging-schul-cloud"
					# deploy "staging" "nuxt-client" $DOCKERTAG "staging-schul-cloud_nuxtclient" "compose-client_thr.dummy" "nuxt-client_thr.yml" "staging-schul-cloud"
				;;
				storybook)
					deploy "hotfix${TEAM}" "nuxt-storybook" $DOCKERTAG "hotfix${TEAM}_storybook" "compose-storybook.dummy" "nuxt-storybook.yml" "hotfix${TEAM}_nuxtclient" "dev"
				;;
				vuepress)
					deploy "hotfix${TEAM}" "nuxt-vuepress" $DOCKERTAG "hotfix${TEAM}_vuepress" "compose-vuepress.dummy" "nuxt-vuepress.yml" "hotfix${TEAM}_nuxtclient" "dev"
				;;
				*)
					echo "$PROJECT does not match one of \"client\", \"storybook\" or \"vuepress\". Deployment will be skipped."
				;;
			esac
		else
			echo "Event detected on branch hotfix*. However, branch name pattern does not match requirements to deploy. Expected hotfix/<team_number>/XX.XX.XX but got $TRAVIS_BRANCH"
		fi
		;;
	*)
		# If no condition is met, nothing will be deployed.
  		echo "Event detected which does not meet any conditions. Deployment will be skipped."
		;;
esac

exit 0
