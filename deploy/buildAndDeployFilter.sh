#! /bin/bash

buildAndDeployFilter () {
	if [ "$TRAVIS_PULL_REQUEST" != "false" ]
	then
		echo "Pull Requests are not build/deployed. (Pull #$TRAVIS_PULL_REQUEST)"
		exit 0
	fi

	if ! [[ $TRAVIS_BRANCH = master || $TRAVIS_BRANCH = develop || $TRAVIS_BRANCH = release* || $TRAVIS_BRANCH = hotfix* ]]
	then
		echo "Branch $TRAVIS_BRANCH is not supposed to be build/deployed.".
		exit 0
	fi
}
