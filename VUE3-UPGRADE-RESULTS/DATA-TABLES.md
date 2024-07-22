# DATA TABLES

- Currently, we have `DataTable` and `BackendDataTable` components. Their structures are very complicated and hard to maintain. We recommend refactoring the data tables with Vuetify components. So that we have clean, maintainable code. After changing, we also have a chance to remove all `base` components.


- We have 3 options:
	1. Reimplement `vue-filter-ui` dependency as our own
	2. Refactor `DataFilter` component
	3. Refactor `DataTables` component
