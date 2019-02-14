#! /bin/bash

# replace special characters in branch name for docker tag
export DOCKERTAG=$( echo $TRAVIS_BRANCH | tr -s "[:punct:]" "-" )

# build containers
docker build -t schulcloud/schulcloud-nuxtclient:latest -t schulcloud/schulcloud-nuxtclient:$DOCKERTAG -t schulcloud/schulcloud-nuxtclient:$GIT_SHA .

# Log in to the docker CLI
echo "$MY_DOCKER_PASSWORD" | docker login -u "$DOCKER_ID" --password-stdin

# take those images and push them up to docker hub
docker push schulcloud/schulcloud-nuxtclient:$DOCKERTAG
docker push schulcloud/schulcloud-nuxtclient:$GIT_SHA
docker push schulcloud/schulcloud-nuxtclient:latest

# screw together config file for docker swarm
eval "echo \"$( cat compose-nuxt-test.dummy )\"" > docker-compose-nuxtclient.yml


# copy config-file to server and execute mit travis_rsa
pwd
ls
openssl aes-256-cbc -K $encrypted_b7461320c5f4_key -iv $encrypted_b7461320c5f4_iv -in travis_rsa.enc -out travis_rsa -d
chmod 600 travis_rsa
scp -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null -i travis_rsa docker-compose-nuxtclient.yml linux@test.schul-cloud.org:~
ssh -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null -i travis_rsa linux@test.schul-cloud.org /usr/bin/docker stack deploy -c /home/linux/docker-compose-nuxtclient.yml test-schul-cloud
# ssh -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null -i travis_rsa linux@test.schul-cloud.org /usr/bin/docker service update --force test-schul-cloud_server

exit 0

