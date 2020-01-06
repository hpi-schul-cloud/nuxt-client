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

# ----------------
# SCRIPTS
# ----------------

inform_live() {
	# $1: Project Name (client, storybook, vuepress)
  if [[ "$TRAVIS_EVENT_TYPE" != "cron" ]]
  then
  curl -X POST -H 'Content-Type: application/json' --data '{"text":":rocket: Die Produktivsysteme können aktualisiert werden: Schul-Cloud Nuxt-$1! Dockertag: '$DOCKERTAG'"}' $WEBHOOK_URL_CHAT
  fi
}

inform_staging() {
  if [[ "$TRAVIS_EVENT_TYPE" != "cron" ]]
  then
    curl -X POST -H 'Content-Type: application/json' --data '{"text":":boom: Das Staging-System wurde aktualisiert: Schul-Cloud Nuxt-Client! https://staging.schul-cloud.org/nuxtversion (Dockertag: '$DOCKERTAG')"}' $WEBHOOK_URL_CHAT
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

	echo "deploy " $DOCKER_IMAGE ":" $DOCKER_TAG " to " $SYSTEM " as " $DOCKER_SERVICE_NAME
	echo "COMPOSEFILE: " $COMPOSE_SRC " => " $COMPOSE_TARGET

	# generate new compose file
	eval "echo \"$( cat $COMPOSE_SRC )\"" > docker-compose-$COMPOSE_TARGET

	# deploy new compose file
	scp -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null -i travis_rsa docker-compose-$COMPOSE_TARGET linux@$SYSTEM.schul-cloud.org:~
	ssh -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null -i travis_rsa linux@$SYSTEM.schul-cloud.org /usr/bin/docker stack deploy -c /home/linux/docker-compose-$COMPOSE_TARGET $STACK_NAME

	# deploy new dockerfile
	ssh -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null -i travis_rsa linux@$SYSTEM.schul-cloud.org /usr/bin/docker service update --force --image schulcloud/schulcloud-$DOCKER_IMAGE:$DOCKER_TAG $DOCKER_SERVICE_NAME
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
		inform_live $PROJECT
		;;

	develop)
		echo "develop"
		case "$PROJECT" in
			client)
				# deploy $SYSTEM $DOCKERFILE $DOCKERTAG $DOCKER_SERVICENAME $COMPOSE_DUMMY $COMPOSE_FILE $COMPOSE_SERVICENAME
				deploy "test" "nuxt-client" $DOCKERTAG "test-schul-cloud_nuxtclient" "compose-client_default.dummy" "nuxt-client.yml" "test-schul-cloud"
			;;
			storybook)
				deploy "test" "nuxt-storybook" $DOCKERTAG "test-schul-cloud_storybook" "compose-storybook.dummy" "nuxt-storybook.yml" "test-schul-cloud"
			;;
			vuepress)
				deploy "test" "nuxt-vuepress" $DOCKERTAG "test-schul-cloud_vuepress" "compose-vuepress.dummy" "nuxt-vuepress.yml" "test-schul-cloud"
			;;
		esac
		;;
	release* | hotfix*)
		echo "release/hotfix"
		case "$PROJECT" in
			client)
				# TODO deploy with themes
				deploy "staging" "nuxt-client" $DOCKERTAG "staging_nuxtclient" "compose-client_default.dummy" "nuxt-client_default.yml" "staging"
				# deploy "staging" "nuxt-client" $DOCKERTAG "staging-schul-cloud_nuxtclient" "compose-client_brb.dummy" "nuxt-client_brb.yml" "staging-schul-cloud"
				# deploy "staging" "nuxt-client" $DOCKERTAG "staging-schul-cloud_nuxtclient" "compose-client_n21.dummy" "nuxt-client_n21.yml" "staging-schul-cloud"
				# deploy "staging" "nuxt-client" $DOCKERTAG "staging-schul-cloud_nuxtclient" "compose-client_open.dummy" "nuxt-client_open.yml" "staging-schul-cloud"
			;;
			storybook)
				deploy "staging" "nuxt-storybook" $DOCKERTAG "staging_storybook" "compose-storybook.dummy" "nuxt-storybook.yml" "staging"
			;;
			vuepress)
				deploy "staging" "nuxt-vuepress" $DOCKERTAG "staging_vuepress" "compose-vuepress.dummy" "nuxt-vuepress.yml" "staging"
			;;
		esac
		;;
esac

exit 0
