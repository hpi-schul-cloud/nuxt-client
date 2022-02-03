# Screenshot Tests

[[toc]]

We use screenshot tests to ensure that we do not accidently break components visually.

## Run screenshot tests

It is **not** recommended to execute the screenshot tests localy, because each system (OS, version, settings) renders fonts/shadows/gradients differently. You can read more about these issues [here](https://storybook.js.org/docs/testing/automated-visual-testing/#challenges).

But on every push to github, a github action will be triggered that you can use to get the screenshot diffs.

### Get diff for failed tests

When running the screenshot tests they may fail. To find out why, you can check the diff output. For each failed screenshot comparison, there will be a diff image for each failed test located at `tests/screenshot/__image_snapshots__/__diff_output__`.

On CI (GitHub Actions) Build, this directory is made available as an artifact to download. You can find it by going to the failed test run and clicking on artificats in the top right corner.

![download artifacts](../../.vuepress/public/screenshot-test-artifacts.png)

## Update screenshots

It's as simple as commenting `@schul-cloud-bot update screenshots` on any PR. This will trigger a github action that will update the failing screenshots.

### What not to test

In general you should not test:

- dynamic components that move
- text heavy components, because of the challenges explained at the top
