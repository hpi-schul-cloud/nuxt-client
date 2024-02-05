# REFACTORING LIST AND ESTIMATIONS

## FILES MUST BE REFACTORED

### `src/components/organisms/DataFilter/DataFilter.vue`

- The component uses `vue-filter-ui` dependency which is not competible with vue-3. And seems there is no info or plan to upgrade the dependeny in its repository.
- **Recommended Solution:** We need to find a way to get rid of the dependency.
- **Potantial Effort:** The custom data tables are using this component, so the data tables must be refactored.
- **Estimation time for refactoring:** _TBD_

### `src/utils/service-template.js`

- This util file is used for generalizing the boilerplate of using basis of some vuex stores. And it uses `Vue.set()` function which is deprecated in vue-3.
- **Recommended Solution-1:** Find another way to introduce some data into the vue instance as `Vue.set()` does in the vue-2 version.
- **Recommended Solution-2:** Refactor the store files which are currently using the `service-template.js` file. The store files are `activation.js, calendar.js, classes.js, content-search.js, course-group.js, courses.js, lessons.js, public-teachers.js, teams.js, users.js`
- **Potantial Effort:** depending on selected solution
- **Estimation time for refactoring:** _TBD depending on selected solution_

### `src/pages/rooms/RoomOverview.page.vue`

- The moving avatar components are based on the `this.$refs` selector. The `$refs` object's properties have been changed in vue-3. So we need to find another way to spot the dragging object properties instead of using `$refs`. This whole page refactoring might be necessary.
- **Recommended Solution:** Find another way to spot the dragging component properties. Especially `getElementNameByRef` method should be replaced.
- **Estimation time for refactoring:** _TBD_

### [v-model breaking change](https://v3-migration.vuejs.org/breaking-changes/v-model.html)

- Some components use `model property` inside which is changed in vue-3 and they need some tiny refactorings.
- These components:
  - `src/components/atoms/vCustomAutocomplete.vue` -- completely removed, vuetify autocomplete component is used instead
  - `src/components/atoms/vCustomSwitch.vue` -- removed, vuetify v-switch will be used
  - `src/components/base/BaseInput/BaseInput.vue`
  - `src/components/base/BaseInput/BaseInputCheckbox.vue`
  - `src/components/base/BaseInput/BaseInputDefault.vue`
  - `src/components/base/BaseInput/BaseInputHidden.vue`
  - `src/components/base/BaseInput/BaseInputRadio.vue`
  - `src/components/molecules/ImportModal.vue`
  - `src/components/molecules/RoomModal.vue`
  - `src/components/molecules/TextEditor.vue`
  - `src/components/molecules/TitleInput.vue`
  - `src/components/organisms/FormNews.vue`
  - `src/components/organisms/Pagination.vue`
  + `src/components/organisms/vCustomDialog.vue`
- **Estimation time for refactoring:** _TBD_

## VUETIFY BASED REFACTORINGS

### Vuetify Labs Component

- Some vuetify-3 components are not released yet.
- These components:
  - `v-calendar`
  - `v-date-picker`
  - `v-data-table`
  - `v-skeleton-loader`
  - `v-stepper`
  - `v-time-picker`
  - `v-tree-view`
  - `v-data-iterator`
- **Recommended Solution-1:** Wait until it's upcoming release.
- **Recommended Solution-2:** Imported from vuelabs to use until they're released. But it needs another refactoring after then.
- **Estimation time for refactoring:** _TBD depending on selected solution_

### Some vuetify components props' usage have been changed. The detailed list can be found [here](VUE3-UPGRADE-SUMMARY.md)

- These components:
  - `v-menu`
  - `v-list`
  - `v-list-item`
  - `v-alert`
  - `v-btn`
  - `v-input`
  - `v-checkbox`
  - `v-radio`
  - `v-switch`
  - `v-tabs`
  - `v-menu`
  - `v-select`
  - `v-combobox`
  - `v-autocomplete`
  - `v-expansion-panel`
  - `v-card`
  - `v-dialog`
- They need tiny refactoring with changing renaming their props etc.
- **Estimation time for refactoring:** _TBD_
