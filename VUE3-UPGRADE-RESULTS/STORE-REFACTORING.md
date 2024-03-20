# STORE REFACTORING

- `src/utils/service-template.js`
- This util file is used for generalizing the boilerplate of using basis of some vuex stores. And it uses `Vue.set()` function which is deprecated in vue-3.

- **Recommended Solution:** Refactor the store files which are currently using the `service-template.js` file. Introducing **Pinia** store will be good for these refactorings.

- The store files are:

```sh
activation.js
calendar.js
classes.js
content-search.js
course-group.js
courses.js,
lessons.js
public-teachers.js
teams.js,
users.js
```
