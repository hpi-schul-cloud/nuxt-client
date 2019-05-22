# Comment Deployed URLs to Pull Requests
if [ "$TRAVIS_PULL_REQUEST" != "false" ] ; then
   curl -H "Authorization: token ${GITHUB_TOKEN}" -X POST \ -d "{\"body\": \"We deployed this pull-request for you. Check it out:\n\n**Docs:** https://docs.${TRAVIS_PULL_REQUEST}.nuxt.schul-cloud.surge.sh \n**Storybook:** https://stories.${TRAVIS_PULL_REQUEST}.nuxt.schul-cloud.surge.sh\"}" \ "https://api.github.com/repos/${TRAVIS_REPO_SLUG}/issues/${TRAVIS_PULL_REQUEST}/comments"
fi
