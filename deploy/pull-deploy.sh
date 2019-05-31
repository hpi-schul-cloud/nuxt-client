# Deploy Docs & Storybook to surge.sh
# and comment deployed URLs to pull requests

# Only run if it is a pull request
if [ "$TRAVIS_PULL_REQUEST" == "false" ];
then
	echo "Do not deploy to test system. This is not a pull request."
	exit 0;
fi


# deploy docs
echo "Deploy docs to surge.sh"
surge --project ./dist/docs --domain docs.${TRAVIS_PULL_REQUEST}.nuxt.schul-cloud.surge.sh

# deploy storybook
echo "Deploy storybook to surge.sh"
surge --project ./dist/storybook --domain stories.${TRAVIS_PULL_REQUEST}.nuxt.schul-cloud.surge.sh


# and there is not already a comment
if curl -s "https://api.github.com/repos/${TRAVIS_REPO_SLUG}/issues/${TRAVIS_PULL_REQUEST}/comments" | grep "${TRAVIS_PULL_REQUEST}.nuxt.schul-cloud.surge.sh"
then
	echo "URL Comment already exists. => Skip"
else
	curl -H "Authorization: token ${GITHUB_TOKEN}" -X POST -d "{\"body\": \"❤️ I have deployed this pull-request for you: \n\n**Docs:** http://docs.${TRAVIS_PULL_REQUEST}.nuxt.schul-cloud.surge.sh \n**Storybook:** http://stories.${TRAVIS_PULL_REQUEST}.nuxt.schul-cloud.surge.sh\"}" "https://api.github.com/repos/${TRAVIS_REPO_SLUG}/issues/${TRAVIS_PULL_REQUEST}/comments"
	echo "Commented URLs to github"
fi
