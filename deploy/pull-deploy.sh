# Deploy Docs & Storybook to surge.sh
# and comment deployed URLs to pull requests

# Only run if it is a pull request
if [ "$TRAVIS_PULL_REQUEST" == "false" ];
then
	echo "Do not deploy to test system. This is not a pull request."
	exit 0;
fi
# and are not in master
if [ "$TRAVIS_BRANCH" == "master" ];
then
	echo "Do not deploy to test system. We are on the master branch."
	exit 0;
fi

# deploy docs
echo "Deploy docs to surge.sh"
surge --project ./dist/docs --domain docs.${TRAVIS_PULL_REQUEST}.nuxt.schul-cloud.surge.sh
# deploy storybook
echo "Deploy storybook to surge.sh"
surge --project ./dist/storybook --domain stories.${TRAVIS_PULL_REQUEST}.nuxt.schul-cloud.surge.sh

# and there is not already a comment
if curl -s "https://api.github.com/repos/${TRAVIS_REPO_SLUG}/issues/${TRAVIS_PULL_REQUEST}/comments" | grep "We deployed this pull-request for you."
then
		curl -H "Authorization: token ${GITHUB_TOKEN}" -X POST \ -d "{\"body\": \"We deployed this pull-request for you. Check it out:\n\n**Docs:** https://docs.${TRAVIS_PULL_REQUEST}.nuxt.schul-cloud.surge.sh \n**Storybook:** https://stories.${TRAVIS_PULL_REQUEST}.nuxt.schul-cloud.surge.sh\"}" \ "https://api.github.com/repos/${TRAVIS_REPO_SLUG}/issues/${TRAVIS_PULL_REQUEST}/comments"
		echo "Commented URLs to github"

else
		echo "URL Comment already exists. => Skip"
fi
