# Deploy Docs & Storybook to surge.sh
# and comment deployed URLs to pull requests

SURGE_SUBDOMAIN=${SURGE_SUBDOMAIN:="nuxt.schul-cloud"}

# Only run if it is a pull request
if [ "$TRAVIS_PULL_REQUEST" == "false" ];
then
	echo "Do not deploy to test system. This is not a pull request."
	exit 0;
fi

if [ -z "$SURGE_LOGIN" ] || [ -z "$SURGE_TOKEN" ];
then
	echo "Do not deploy to test system. Missing SURGE_LOGIN or SURGE_TOKEN env variables for deployment."
	exit 0;
fi

if [[ $1 == storybook ]]
then
	# deploy storybook
	echo "Deploy storybook to surge.sh"
	surge --project ./dist/storybook --domain stories.${TRAVIS_PULL_REQUEST}.${SURGE_SUBDOMAIN}.surge.sh
fi
if [[ $1 == docs ]]
then
	# deploy docs
	echo "Deploy docs to surge.sh"
	surge --project ./dist/docs --domain docs.${TRAVIS_PULL_REQUEST}.${SURGE_SUBDOMAIN}.surge.sh
fi


if [ -z "$GITHUB_TOKEN" ];
then
	echo "Do not comment back deployed url. Missing GITHUB_TOKEN env variable."
	exit 0;
fi

# and there is not already a comment
if curl -H "Authorization: token ${GITHUB_TOKEN}" -s "https://api.github.com/repos/${TRAVIS_REPO_SLUG}/issues/${TRAVIS_PULL_REQUEST}/comments" | grep "deployed this pull-request for you"
then
	echo "URL Comment already exists. => Skip"
else
	curl -H "Authorization: token ${GITHUB_TOKEN}" -X POST -d "{\"body\": \"❤️ I have deployed this pull-request for you: \n\n**Docs:** http://docs.${TRAVIS_PULL_REQUEST}.${SURGE_SUBDOMAIN}.surge.sh \n**Storybook:** http://stories.${TRAVIS_PULL_REQUEST}.${SURGE_SUBDOMAIN}.surge.sh\"}" "https://api.github.com/repos/${TRAVIS_REPO_SLUG}/issues/${TRAVIS_PULL_REQUEST}/comments"
	echo "Commented URLs to github"
fi
