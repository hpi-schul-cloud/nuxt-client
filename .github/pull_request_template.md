# Short Description

<!-- Write a short explanation of what this Pull Request does -->

<!--
  This Pull-Request template helps the reviewers as well as servers as a checklist for you. Please feel out all possible sections.

  Quality guidelines:
    - Code should be self-explanatory; Document code that is not self-explanatory
    - Code respects SOLID principles, DRY, YAGNI, KISS
    - Think about potential bugs this Pull Request might introduce
    - Keep security in mind
    - Write tests (Unit and Integration), including for error cases. Don't decrease coverage
    - Business logic should be implemented in the API; never trust the client
    - UI changes should be discussed & agreed with the UX-Team before staring
    - Keep the CHANGELOG up-to-date
    - Boyscout rule: leave the code in a better state than you found it. Remove unnecessary lines. Listen to the linter.
-->

## Links to Ticket and related Pull-Requests

<!--
Base links to copy
- https://ticketsystem.dbildungscloud.de/browse/SC-????
- https://github.com/hpi-schul-cloud/schulcloud-server/pull/????
- https://github.com/hpi-schul-cloud/end-to-end-tests/pull/????
- https://github.com/hpi-schul-cloud/schulcloud-client/pull/????
-->

## Changes

<!--
- What will the PR change?
- Why are the changes required?
- Links to documentation / tickets if exists, or provide more details here.
-->

## Data-security <sub><sup>details [on Confluence](https://docs.dbildungscloud.de/x/2S3GBg)</sup></sub>

<!--
Please note here about:
- any data model changes
- any changes about logging of user data
- any changes about permissions
- user input, authentication and other user data related things
If you are not sure if it is relevant, take a look at confluence or ask the data-security team.
-->

## Deployment

<!--
Keep in mind to changes to seed data, if changes are done by migration scripts.
Changes to the infrastructure have to discussed with the devops.
This information should be also in corresponding ticket, and collected in release deployment ticket.

This point should includes following information:
- What else is required for its deployment?
- Environment variables like FEATURE_XY=true
- Are there any migration scripts to be run?
-->

## New Repos, NPM packages or vendor scripts

<!--
- Keep in mind the stability, performance, activity and author.
- Describe why it is needed.
-->

## Screenshots of UI changes

<!--
- For UI changes, insert screenshots here.
- Has it been reviewed by a UX colleague?
-->

## Checklist before merging

- [ ] QA: In addition to review, the code has been manually tested (if manual testing is possible)
- [ ] PO: Any deviation from requirements was agreed with Product-Owner / ticket author / support-team

> Notice: Please keep this Pull-Request as a Draft (or add WIP label), until it is ready to be reviewed
