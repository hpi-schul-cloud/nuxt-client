# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

Allowed Types of change: `Added`, `Changed`, `Deprecated`, `Removed`, `Fixed`, `Security`

## [Unreleased]

### Changed

### Fixed

- BC-661 - School logo was missing in top bar
- BC-661 - Fix saving of general school settings if no county is selected
- BC-828 use generated API client
- BC-839 - Remove search filter while dragging on rooms-overview page
- BC-878 - school administration: if saving general settings the school logo is kept if not explicitly removed

### Removed

- BC-832 - remove github images from CORS

## [26.18.0] - 2021-11-23

### Changed

- BC-740 - BC-849 - change ansible vars for docker image and tag
- BC-633 - moved type entitties from the store modules to store/types folder
- BC-157 - add typescript to task store in nuxt client

### Added

- BC-724 - Listing elements and search features added to room-overview

## [26.17.0] - 2021-11-16

### Added

- BC-537 - added new vuetify floating action button
- BC-155 - add toggle to filter task of substition courses
- BC-580 - adding substitute label to task in the task overview

### Changed

- BC-589 - BC-653 - Change auto deployment to a reusable workflow

## [26.16.0] - 2021-11-09

## [26.15.0] - 2021-11-02

### Added

- BC-392 - added skip to main content link (accessibility feature)
- BC-496 - Added Renaming of a group of rooms
- BC-40 - ansible rocketchat variable renaming
- BC-273 - Adding data test id's for nuxt task overview
- BC-577 - Refactoring rooms-overview page, its components and tests

### Changed

- BC-402 - change e2e test include to reusable workflows
- BC-501 - displaying topic name in task overview

### Changed

- BC-576 - link for faq in the top-navigation
- BC-379 - updated the engine version to node 16 and npm 8

## [26.14.0] - 2021-10-26

### Added

- BC-501 - displaying topic name in task overview

## [26.13.0] - 2021-10-19

### Added

- BC-428 - bug-adjust-tint-for International
- BC-495 - ungrouping dashboard elements for room overview

### Changed

### Fixed

- BC-393 - cleaned up some translations

## [26.12.1] - 2021-10-12

### Changed

- BC-379 - hard-code node 14 and npm 6

## [26.12.0] - 2021-10-12

### Added

- BC-307 - design and content transformation HPI Schul-Cloud in dBildungscloud
- BC-312 - added bottom border to headline of new DefaultWireframe and added it to task overview
- BC-343 - run unstable e2e tests on label `run unstable tests`
- BC-6 - showing drafts for teachers in new tab
- BC-339 - grouping dashboard elements

### Changed

- BC-217 - update LibreOffic domain at http-headers.js on ansible configmap-files.yml.j2
- BC-382 - fixing error in 'removeSystem' method for new school-settings page
- BC-397 - replaced base inputs in the user creation form with vuetify components
- BC-21 - use generated api client for news

### Fixed

- BC-381 - fixed color of menu items in the sidebar

### Security

- BC-296 - updated dependencies with high severity security issues
- BC-333 - updated node-sass

## [26.11.1] - 2021-09-29

### Fixed

- BC-365 - fixed task overview pagination

## [26.11.0] - 2021-09-22

### Added

- BC-167 - Added a wireframe for pages
- BC-252 - creating componenets and grid for rooms-overview page
- BC-98 - added unit tests for school admin page
- BC-317 - implemented drag&drop avatar components
- BC-310 - added task count to course filter

### Changed

- BC-68 - e2e run dependent on build image job
- BC-234 - replaced hpi by datport in nbc imprint
- BC-81 - removes old lern-store mode env var
- BC-179 - refactored homeworks store
- BC-311 - renamed homeworks to tasks in client to fit server naming
- BC-266 - remove build step at runtime, again
- BC-321 - changed further hrefs to to

### Fixed

- BC-195 - fixed course filter for student task dashboard
- BC-94 - clean up the colorsystem and fix some UI issues
- BC-309 - now opening correct panel when task were filtered
- BC-313 - fixed active tab mobile behaviour and color
- BC-322 - fixed race condition while loading school in school settings page

## [26.10.1] - 2021-09-07

### Fixed

- BC-246 - Routing for nuxt that have a run time error with npm run start and nuxt runtime envirements

## [26.10.0] - 2021-09-03

### Added

- BC-133 - added unit tests for filePaths and accounts store modules
- BC-132 - added unit tests for env-config, content, and autoLogout store modules
- BC-5 - now showing open and completed taks for students in a tab view
- BC-136 - added no-focused-tests rule to jest config file
- BC-38 - BC-126 - Add ansible files for Bosscloud (default)
- BC-202 - added $cookies ts intializer and accessor

### Changed

- BC-5 - renamed sidebar item "Open Tasks" to "Current Tasks"
- BC-38 - BC-126 - Add ansible files for Bosscloud (default)
- BC-190 - removing fileStorageData on school settings
- BC-18 - refactored the envConfig, content, accounts, autoLogout, and filePaths store modules to typescript and the corresponding components' access to them
- BC-14 - changed thr contact address
- BC-64 - execute e2e tests via push on main
- BC-37 - BC-56 - reduce resource consumption for deployed nuxtclient
- BC-202 - refactored the auth and schools store modules to typescript and the corresponding components' access to them

### Removed

- BC-201 - removed the both unused auth action hasRole and roles store module

### Fixed

- BC-191 - fix ldap edit button showing up for uneditable systems

## [26.9.1] - 2021-08-16

- SC-9192 - fix add material to course lesson and load exsiting ldap config for modification

## [26.9.0] - 2021-08-13

- SC-9192 - access feathers and nestjs apps over their dedicated version prefixes
- SC-9191 run e2e tests in pull requests with 'run tests' label
- SC-9280 fix primary and secondary colors according to old client

## [26.8.0] - 2021-08-05

- SC-9236 - update THR imprint
- SC-9236 - remove HPI footer logo from federal states instances
- SC-9169 - Fixed icon color in context menu

## [26.7.0] - 2021-07-28

- SC-9217 - Toggle function in vCustomDoublePanels
- SC-9175 - Fixed filtering for old and future classes
- SC-9221 - changed contact data in imprint
- SC-9232 - Align gender specific language between legacy and nuxt

## [26.6.2] - 2021-07-21

### Changed

- SC-9251 - Remove misbehaving checkbox in student/teacher creation to send registration link

## [26.6.1] - 2021-07-21

### Changed

- change default lernstore mode to edusharing

### [26.6.0] - 2021-07-20

- SC-9159 - Redirect the routes for news for the new v3 API
- SC-9083 - School administration page in nuxt with vuetify
- SC-9108 - Refactor news/create page and form component
- SC-9189 - Adding expansion panels to teacher's task dashboard
- SC-9201 - Adding expansion panels to student's task dashboard

### Added

- SC-9090 - implemented a loading state in the service-template
- OPS-2574 - Removeing autodeployed branches for developers if branch deleted
- SC-9083 - Added school administration page and related stores
- SC-9083 - Added simple custom vuetify dialog component for e.g. confirm dialogs

### Changed

- SC-8887 - data privacy in footer links changed
- SC-8448 - resolves Merlin URL before passing to legacy client
- SC-9077 - refactored store actions returning data
- SC-9126 - changed the way the stores state is accessed; `mapState` and `store.state` were substituted for `mapGetters` and `store.getters` respectively; and changed the naming of the template and several other stores getters
- SC-9122 - changed getters logic from components to the store
- SC-9108 - refactored news
- SC-9168 - POC for Typescript store module (news)

### Removed

- SC-9083 - RSS feeds are no longer a part of the school administration page

### Fixed

- SC-9131 fixed the consent table loading the wrong list of users and refactored the consent page and feature of password changing is fixed
- SC-9106 - Remove the possibility to change an action's endpoint with a param from the component
- SC-9093 - Load default language and timezone from server
- SC-9158 - fixed launch config to debug a single test
- SC-9160 - fixed getStatus getter in service-template

## [26.5.1] - 2021-06-30

### Added

- SC-9143 - add task dashboard filter for teachers and students

### Changed

- Changed name of click-outside vue directive

## [26.5.0] - 2021-06-28

### Added

- SC-9143 - add teacher open task dashboard

## [26.4.3] - 2021-06-24

### Changed

- OPS-2467 - changes build pipeline to github actions

### Changed

- rename permission TASK_DASHBOARD_VIEW_V3

## 26.4.1

### Changed

- SC-9144 - fixed build with env SC_THEME

## 26.4.0

### Removed

- pages 'account', 'course', 'calendar' and components exclusively used by these pages

### Added

- SC-9004 - Sync env variables between backend and frontend
- SC-9023 - Add open homework overview

### Changed

- SC-9004 - Change ci build

## 26.2.1

### Changed

- SC-9114 - project naming

## 26.2.0

### Added

- SC-8250 - connect UI for bulk delete
- SC-8164 - apply deletion concept to the deletion of students and teachers
- SC-7937 - added Lern-Store collections multi-select
- SC-8156 - added Spanish as an available language
- SC-9004 - Sync env variables between backend and frontend
- OPS-1499 - added feature Branch to CI Pipeline for team based HPI Schul-Cloud instances

### Changed

- QF/Pull Request Workflow - adds checkbox for manual test, more checks, splits tests
- SC-9065 - integrates styles repository into nuxt client
- SC-7944 - changes ids for Lern-Store content and adds a link back to collection
- SC-8666 - changed words in the language.json about gender and removed the helpdesk from the sidebar-menu-item
- SC-7944 - changes field for Lern-Store content id and adds a link to collection
- OPS-1508 - Updated limits for cpu and ram to the docker compose files ( 20.11.2020 )
- SC-9004 - Change ci build

### Fixed

- Fixed further conflicting screenshots

## 26.1.2

### Fixed

- pages 'account', 'course', 'calendar' and components exclusively used by these pages
- SC-9063 - Removed "unsafe-inline" from script-src in CSP

## 26.1.1

### Fixed

- Fixed conflicting screenshots

## 26.1.0 - 2021-04-27

### Added

- SC-8916 - set page titles to some administration pages
- SC-8681 - added ADMIN_TABLES_DISPLAY_CONSENT_COLUMN environment variable to display/hide the NAT consent column and the legend

### Fixed

- SC-8518 - fixed layout issues of checkbox
- SC-8881 - fixed double roles user (admin, teacher) not being able to edit other teachers
- SC-8519 - Admin Table Bugfix - Set current date for filter, without input; Error handling parsing dates
- SC-8878 - Fixing invalid date on filter chips, setting default filter start and end day to 1900-01-01 and 2099-12-31
- SC-8910 - fixed delete action being available when school is external

### Removed

- SC-8708 - removed firstname and lastname filters in NAT

## 26.0.6 - 2021-04-06

### Changed

- SC-8837 - activate ldap config pages again

## 26.0.5 - 2021-04-01

### Fixed

- SC-8837 - fix datetime timezone issues

## 26.0.4 - 2021-03-24

### Changed

- SC-8822 - add availability to phone number in imprint

## 26.0.3 - 2021-03-24

### Changed

- SC-8822 - change phone number in imprint

## 26.0.1 - 2021-03-22

### Added

- SC-8156 - introduce Spanish

## 26.0.0

### Fixed

- SC-8554 - fixed the QR code generation with double role
- SC-8719 - fixed pagination not setting currentPage to 1

### Added

- SC-8720 - add ellipsis to NAT rows

### Removed

- SC-8681 - removed NAT consent column and legend for external schools
- SC-8702 - disabled the select all button in NAT
- SC-8666 - changed words in the language.json about gender and removed the helpdesk from the sidebar-menu-item

## 25.6.1

### Fixed

- SC-8576 - fixed the several requests issue in the LDAP config

## 25.6.0 - 2021-02-21

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
