# BestPractices writing Vue-Code

## Based on discussions in FrontendArcGroup

### data-testid - [Meeting Notes 2022-11-04](https://docs.dbildungscloud.de/x/mYHADQ)

Please use ``<div ... data-testid="some-example" ...>`` in your HTML-code if you want to define a data-testid.

- do not use uppercase-characters
- only use one dash - right after data

We also recommend to use refs instead of data-testids. But if you do that you ensure not to remove them once they are in the code... as they can be used in the component-code and for testing:

- [VueJs - template refs](https://vuejs.org/guide/essentials/template-refs.html)
- [VueTestUtils - ref](https://v1.test-utils.vuejs.org/api/#ref)



### Wrapping of inject - [Meeting Notes 2022-12-02](https://docs.dbildungscloud.de/x/2gIMDg)
> We want to provide a simple factory function that produces a unique, identifiable error, if an inject fails and we want to avoid adding code to your TypeScript-components only to prevent linter errors.
> The topic will be implemented with this ticket: [Jira - BC-2813](https://ticketsystem.dbildungscloud.de/browse/BC-2813). It contains a lot of details on that issue.
>
> ... Details should be added here. soon...


### Exception handling - [Meeting Notes 2022-11-25](https://docs.dbildungscloud.de/x/joL4DQ)

**useApplicationError** is a composable providing a typed factory function for creating application errors.
A global error handler for putting application errors takes those and puts them into a store and a global error page will display them.

Exceptions should be thrown using them - like this:

```TypeScript
// src/pages/user-migration/UserMigration.page.vue
import { useApplicationError } from "@/composables/application-error.composable";

const { createApplicationError } = useApplicationError();
throw createApplicationError(HttpStatusCode.BadRequest);
```

```TypeScript
// src/router/guards/permission.guard.ts
import { useApplicationError } from "@/composables/application-error.composable";
import { applicationErrorModule } from "@/store";

const { createApplicationError } = useApplicationError();
applicationErrorModule.setError(createApplicationError(401));
```


### How to test? What to mock? Good examples? [Meeting Notes 2022-11-11](https://docs.dbildungscloud.de/x/6gHSDQ)

We discussed this topic quite often in the FrontendArcGroup (e.g. see link to meeting Notes above).
The ideas and hints were combined in this file:
``docs / 1-Tutorials / WritingTests /`` **UnitTests.md**
> Furthermore we are working on "How to write testable components" which will be added to this docs folder, too

### ts-ignore comments [Meeting Notes 2022-10-28](https://docs.dbildungscloud.de/x/2gGvDQ)

Everybody should try to avoid ``// @ts-ignore`` and try his/her best to define the types of variables in TypeScript files.

### Feature Flags

If there is a new functionality that should only be available on certain systems, we introduce new FEATURE-Flags into the SchulCloud-Backend and into the dof-repository, that contains the configuration for all our instances.

Our Vue-Frontend requests all FEATURE-flags and provides global access to them by using this code (example):

```TypeScript
import { envConfigModule } from "@/store";
if (envConfigModule.getEnv.FEATURE_COPY_SERVICE_ENABLED) {
    ...
}
```

### Vue project structure

The structure of this project will move from the old *Atomic Design* (= using molecules- and atoms- folders) to a more use-case-centeric approach.
Details are documented here: [Vue 3 project structure](https://docs.dbildungscloud.de/x/oYAgDQ)

That's the aim - but there is much to do. For the moment we started to break up the *Atomic Design* by introducing feature-centric folders. (e.g. ``src / components /share-course / ...``).

### Composables

Composables are a great way to make our code more reusable and to extract code from components. If you want to write a composable, consider using one of these well documented and well tested ones:
[VueUse - Collection of Vue Composition Utilities](https://vueuse.org/)

If you write a composable:

- it should have the extension ``.composable.ts``
- should be placed in your feature folder (see section "Vue project structure" above), if it is only used inside of your feature
- should be placed in the global folder ``/ src / composables``, if it is used in multiple features

### Using generated API and it's types

{{ tbd }}

// TODO: check all meeting notes older than 2022-10-14