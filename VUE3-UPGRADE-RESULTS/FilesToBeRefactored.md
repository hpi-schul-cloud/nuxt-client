# FILES NEED TO BE REFACTORED

1. `src/components/organisms/DataFilter/DataFilter.vue`
   - The component uses `vue-filter-ui` dependency which is not competible with vue-3. And seems there is no info or plan to upgrade the dependeny in its repository. 
   - **Recommended Solution:** We need to find a way to get rid of the dependency.
   - **Potantial Effort:** The custom data tables are using this component, so the data tables must be refactored.
   - **Estimation time for refactoring:** _TBD_

2. `src/utils/service-template.js`
   - This util file is used for generalizing the boilerplate of using basis of some vuex stores. And it uses `Vue.set()` function which is deprecated in vue-3.
   - **Recommended Solution-1:** Find another way to introduce some data into the vue instance as `Vue.set()` does in the vue-2 version.
   - **Recommended Solution-2:** Refactor the store files which are currently using the `service-template.js` file. The store files are `activation.js, calendar.js, classes.js, content-search.js, course-group.js, courses.js, lessons.js, public-teachers.js, teams.js, users.js`
   - **Potantial Effort:** depending on selected solution
   - **Estimation time for refactoring:** _TBD depending on selected solution_

3. `src/components/atoms/vCustomFab.vue`
   - The component uses the vuetify `speed-dial` component and it seems not to be exported in Vuetify-3 yet. There is an open PR in library's repository but no info when will be released.
   - **Recommended Solution:** Wait until it's upcoming release.
   - **Estimation time for refactoring:** _TBD_

4. 