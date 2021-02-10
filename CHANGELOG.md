# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

Allowed Types of change: `Added`, `Changed`, `Deprecated`, `Removed`, `Fixed`, `Security`

## Unreleased

### Added

- SC-8156 - added Spanish as an available language

### Changed

- OPS-1508 - Updated limits for cpu and ram to the docker compose files ( 20.11.2020 )

## 25.6.0 - 09-02-21

### Added

- SC-8390 - added Lern-Store collections flag
- SC-8328 - added back button in Lern-Store
- SC-7762 - added collection icon for Lern-Store card

### Changed

- SC-8356 - authenticate docker hub requests
- SC-8433 - update text in Lern-Store

## 25.5.2

### Fixed

- SC-8577 - fixes the LDAP config roles section validation to not require it when user attribute is toggled

## 25.5.1

### Changed

- SC-8454 - adds a delay in Lern-Store search, to reduce load on Edu-Sharing

## 25.5.0

### Changed

- SC-8381 - change welcome text on Lern-Store
- SC-8094 - improves unit testing for Lern-Store collections

## 25.3.0

### Added

- SC-7824 - Set proper email address and label for data privacy, common terms of use
- SC-7023 - Implement the editor and task item on the course page
- SC-7543 - added validate page to the LDAP configuration feature
- SC-6825 - change collapsable icon
- SC-7488 - added 3 components in the organisms/ldap for the ldap-config form
- SC-6293 - restricts Lern-Store access by permission
- SC-6708 - added data-testids to the students table in administration page
- SC-6709 - added data-testids to the teachers table in administration page
- SC-7629 - created Roles component to the ldap page
- OPS-1508 - added limits for cpu and ram to the docker compose files ( 05.11.2020 )
- SC-7489 - added input validation to the ldap config components
- SC-7798 - added ADMIN_VIEW and SCHOOL_EDIT permission check to ldap config page
- SC-6043 - Prepare a concept for a general error handling in nuxt-client
- SC-5473 - Add selectors for lernstore test automation
- SC-7053 - Introduce Typescript for nuxt-client
- SC-7932 - Implemments a new view for collections
- SC-8219 - Adding a function in datetime.js and some code-refactoring

### Fixed

- SC-8323 - Fixed clearing of collection view when applying new queries
- SC-7686 - Fixed naming convention for Lern-Store
- SC-8169 - fixed ldap classes section data being sent when toggle is off
- SC-8158 - fixed ldap config initial data load and conditional rendering in activate page
- SC-7845 - fixed header tab name on login-instances page
- SC-7845 - fixed the changelog github action
- SC-6293 - loads full permissions for user, e.g. school permission too, not just the ones on his role
- SC-7557 - fixes lernstore modal width
- SC-7492 - Fixes unstable search results label

### Changed

- SC-6060 Updated caniuse-lite
- SC-3788 Renamed Messenger component to meet naming convention
- IMP-160 Adjusted test.yml and related documentation after the repo integration-tests was renamed to end-to-end-tests
- SC-7796 - Input fields border-width change on hovering

## Added

- SC-8514 - QR Code generation fails
- SC-7020 - added a new course TaskItem component

### Changed in Unreleased

- SC-5476 Renamed env vars to be consistent with old client and server

## 25.2.1

## Changed

- SC-7804 Renamed BaseDialog/index
- Adjusted github actions to use end-to-end-tests instead of integration

## 25.2.0

### Changed

- SC-7381 - Changed the consent get request limit to the lenght of selectedStudents

### Fixed

- SC-7339 - Fixed consent permission to STUDENT_EDIT from STUDENT_CREATE, which was not allowing teachers to access the bulkconsent action
- SC-7198 - fixes links in login page
- SC-6549 - Added missing Help section in sidebar
- SC-6357: Fixed the bouble loading issue in admin tables when changing the number of elements to display
- SC-6831 Fixes search/clear icons behaviour in lernstore

## [25.1.1] - 2020-10-21

### Added

- SC-7447 - Add warning text for links when leaving the schul-cloud platform

## 25.0.2

- SC-6932 added translation keys instead of hardcoded strings for sidebar items

## 25.0.1

## 25.0.0

- SC-6628 Changing backend url endpoint while analog consenting
- SC-6682 Reduces search time in lernstore
- SC-6021 Added fallback icons to the assets directory that are rendered when no external icons are available (fix for the EdgeHTML browser)

## [24.5.0] - 2020-09-14

### Changed

- SC-6474 in admin tables, edit column key is filtered out of column data object if school is external

## [24.4.1] - 2020-09-08

- SC-6701 - changed domain for ghost (mint-ec pages)

## [24.4.0] - 2020-08-31

- SC-5410 language dropdown in account page for selecting user language

## [24.3.0] - 2020-08-25

## [24.2.3] - 2020-08-19

### Changed - 24.2.1

- SC-6239 Changed default email domains in many different places from @schul-cloud.org to @hpi-schul-cloud.de
- SC-6239 Changed links to blog to blog.hpi-schul-cloud.de

## [23.6.0] - 2020-07-21

### Changed

- SC-5558 change the edusharing lernstore empty state and initial state components. Made svg images specific to the theme

- SC-6022 Change of the 'Einverständnis' column name to the 'Registrierung' in the teachers admin table.

### Added - 23.6.0

- Quickfix - change URL of 'Fortbildungen' from 'lern.cloud' to 'lernen.cloud'
- SC-4577 school specific privacy policy can be added by the school admin. If school specific privacy policy is exists it is shown to every school user by the registration, first login and in the footer of the page. If it was changed the privacy policy should be confirmed by every school user
- SC-2763 [#1084](https://github.com/schul-cloud/nuxt-client/pull/1084) Learnstore: use edu sharing content, implemented add material to the course feature, clickable tags, authors, providers

## ## [23.5.2] - 2020-07-17

- SC-5653 update mint-ec email addresses

## ## [23.5.1] - 2020-07-09

- SC-5494 Changed link in navigation bar
- SC-5529 update hpi school-cloud brand name

## ## [23.5.0] - 2020-06-21

### Changed in 23.5.0

- Upgrade to the 'new' Lern Store with a plus sign [#1054](https://github.com/schul-cloud/nuxt-client/pull/1054)
- Personalized dataprivacy policy for admin [#1035](https://github.com/schul-cloud/nuxt-client/pull/1035)
- Fix of unit tests in Nuxt client [#1028](https://github.com/schul-cloud/nuxt-client/pull/1028)

## ## [23.0.0] - 2020-05-19

### Changed in 23.0.0

- `controllableData`-mixin [#799](https://github.com/schul-cloud/nuxt-client/pull/799) as a helper for optionaly syncable props. Check [the documentation for more details](./docs/1-Tutorials/OptionalyPropControllableData.md).

## [22.10.0] - 2020.05.11

### Changed in 22.10.0

- `controllableData`-mixin [#799](https://github.com/schul-cloud/nuxt-client/pull/799) as a helper for optionaly syncable props. Check [the documentation for more details](./docs/1-Tutorials/OptionalyPropControllableData.md).

## [1.1.1]

### Changed

- New Legacy Client Fallback Routing - Read the new instructions [here](/1-Tutorials/FallbackRoutingForOldClient.md). For deployment of the nuxt client, almost all variables that where required before can be removed. There is no need anymore for env variables of the old client. But there are two new ones: `LEGACY_CLIENT_URL` and `PROXY_LOG_LEVEL`. You can find out more in our [build documentation](0-GettingStarted/1-Build.md#http://localhost:4002/0-GettingStarted/1-Build.html#environment-variables-runtime).

## [1.1.0]

### Changed

- New Atomic Design Directory Structure - We now organize our components in a new way. Read more [here](/0-GettingStarted/3-DirectoryStructure.md#src-components).
