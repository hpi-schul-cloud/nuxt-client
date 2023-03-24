# <a name='BranchNameConventions'></a>Git Conventions

Each change should be done in a Ticket (no matter how small).

We use a [Feature Branch model](https://www.atlassian.com/git/tutorials/comparing-workflows/feature-branch-workflow). Start a branch from main and make a PR to main.

**Branch naming:**

`{{ PROJECT_ABBREVIATION }}-{{ NUMBER }}-word1-word2-word2`

e.g.: ``BC-1234-course-copy``

We try to keep branch names small. The Ticket Number should be in Uppercase (e.g BC-1234) but the namespace should be in lowercase. It should stay below 64 letters.

## <a name='PullRequests'></a>Pull Requests

Pull Requests must contain a relevant description (template provides useful information, when creating the PR).

In case of UI changes also put a screenshot and talk to UX if thats fine like it is.
All Pull Requests Criterias (as defined in deployment pipeline) must be green before merge,
e.g. 1 approving review, unit tests or QA checkbox in PR template.

We merge by squash strategy. The squashed commit subject should start with a ticket number and end with a PR number. Write commit messages in imperative and active.

**Example:**

```Text
BC-1993 - lesson lernstore and geogebra copy (#3532)

In order to make sure developers in the future can find out why changes have been made,
we would like some descriptive text here that explains what we did and why.

- change some important things
- change some other things
- refactor some existing things

# We dont need to mention tests, changes that didnt make it to main, linter, or other fixups
# only leave lines that are relevant changes compared to main
# comments like this will not actually show up in the git history
```

**Note for working with Windows:** We strongly recommend to let git translate line endings. Please set `git config --global --add core.autocrlf` input when working with windows.
