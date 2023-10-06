# ESTIMATIONS FOR VUE.3x UPGRADE

| Issue                        | Remarks                                                      | Effort Estimation min PD | Effort Estimation max PD | Comment              |
| ---------------------------- | ------------------------------------------------------------ | -----------------------: | -----------------------: | -------------------- |
| Dependency Upgrades          | [details](DEPENDENCY-UPGRADES.md)                            |                        3 |                        5 |                      |
| Breaking Changes             | [details](BREAKING-CHANGES.md)                               |                        - |                        - | covered by following |
| Vue 3.x Upgrade              | [details](VUE3-UPGRADE.md)                                   |                        3 |                        5 |                      |
| Vuetify 3.x Upgrade          | [details](VUETIFY-UPGRADE.md)                                |                        7 |                       10 |                      |
| Refactoring Pages/Components | [details](FilesToBeRefactored.md)                            |                       15 |                       20 |                      |
| Refactoring Unit Tests       | [details](TESTING.md)                                        |                       20 |                       25 |                      |
| Refactoring Stores           | [details](STORE-REFACTORING.md)                              |                        1 |                        2 |                      |
| Refactoring DataTables       | [details](DATA-TABLES.md)                                    |                        5 |                        7 | decided for Option-1 |
|                              | - Option-1 Reimplement `vue-filter-ui` dependency as our own |                        5 |                        7 |                      |
|                              | - Option-2 Refactor `DataFilter`                             |                        - |                        - |                      |
|                              | - Option-3 Refactor `DataTables`                             |                        - |                        - |                      |
| Unpredictable issues         |                                                              |                        3 |                        5 |                      |
| **TOTAL**                    |                                                              |                       57 |                       79 |                      |
