# BestPractices writing Vue-Code in this project

<!-- vscode-markdown-toc -->
* [Conventions](#Conventions)
	* [Vue project structure](#Vueprojectstructure)
	* [filenames](#filenames)
	* [data-testid(s)](#data-testids)
	* [ts-ignore comments](#ts-ignorecomments)
	* [Composables](#Composables)
* [Implementations](#Implementations)
	* [Feature Flags](#FeatureFlags)
	* [Using generated API and it's types](#UsinggeneratedAPIanditstypes)
	* [User-Permissions on Pages](#User-PermissionsonPages)
	* [Exception handling](#Exceptionhandling)
	* [inject - fallback throwing an error](#inject-fallbackthrowinganerror)

<!-- vscode-markdown-toc-config
	numbering=false
	autoSave=true
	/vscode-markdown-toc-config -->
<!-- /vscode-markdown-toc -->

## <a name='Conventions'></a>Conventions

### <a name='filenames'></a>filenames

Files should be consistently named like this:
| file content   |   filename                    |
|----------------|------------------------------:|
| Components     | `YourComponent.vue`           |
| Pages          | `YourPageName.page.vue`       |
| Layouts        | `yourLayoutName.layout.vue`   |
| Composables    | `yourComponent.composable.ts` |
| Stores / Utils | `yourFileName.ts`             |
| Tests          | `yourTestFile.unit.ts`        |

**!!! ALERT - dashes / camelCase !!!**
> *we have an inconsistency regarding the name itself being written "with-dashes" or in "camelCase". High majority of the filenames is written in camelCase. So this is the recommendation here.*

### <a name='Vueprojectstructure'></a>Vue project structure

**Near future**: The structure of this project will move from the old *Atomic Design* (= using molecules- and atoms- folders) to a more use-case-centeric approach.
Details are documented here: [Vue 3 project structure](https://docs.dbildungscloud.de/x/oYAgDQ)

**Far future**: Linter Rules to enforce the project structure as decided in Frontend Arc Group Meeting 2022-08-26.

**Current status**: For the moment we started to break up the *Atomic Design* by introducing feature-centric folders. (e.g. ``src / components /share-course / ...``).


### <a name='data-testids'></a>data-testid(s)

Please use ``<div ... data-testid="some-example" ...>`` in your HTML-code if you want to define a data-testid.

* do not use uppercase-characters
* only use one dash - right after data

We also recommend to use **ref**s instead of data-testids. But if you do that, you need to be careful when removing them... as they could be used in the component-code AND in tests:

- [VueJs - template refs](https://vuejs.org/guide/essentials/template-refs.html)
- [VueTestUtils - ref](https://v1.test-utils.vuejs.org/api/#ref)

*Also look here: Frontend Arc Group: Meeting Notes 2022-11-04*


### <a name='ts-ignorecomments'></a>ts-ignore comments

Everybody should try to avoid ``// @ts-ignore`` and try his/her best to define the types of variables in TypeScript files.

*Also look here: Frontend Arc Group: Meeting Notes 2022-10-28*


### <a name='Composables'></a>Composables

Composables are a great way to make our code more reusable and to extract code from components. If you want to write a composable, consider using one of these well documented and well tested ones:
[VueUse - Collection of Vue Composition Utilities](https://vueuse.org/)

If you write a composable:

* it should have the extension ``.composable.ts``
* should be placed in your feature folder (see section "Vue project structure" above), if it is only used inside of your feature
* should be placed in the global folder ``/ src / composables``, if it is used in multiple features

## <a name='Implementations'></a>Implementations


### <a name='FeatureFlags'></a>Feature Flags

If there is a new functionality that should only be available on certain systems, we introduce new FEATURE-Flags into the SchulCloud-Backend and into the dof-repository, that contains the configuration for all our instances.

Our Vue-Frontend requests all FEATURE-flags and provides global access to them by using this code (example):

```TypeScript
import { envConfigModule } from "@/store";
if (envConfigModule.getEnv.FEATURE_COPY_SERVICE_ENABLED) {
    ...
}
```
### <a name='UsinggeneratedAPIanditstypes'></a>Using generated API and it's types

{{ tbd }}

### <a name='User-PermissionsonPages'></a>User-Permissions on Pages

The permissions are controlled by `createPermissionGuard` middleware method that receives two parameters. The first parameter should contain an array of the `userPermission` that we want to give the users permission to reach the page. The second parameter is an optional fallback route. If the second parameter isn't provided and the user has no permission to reach the page, an error page `(401)` is shown.

```Typescript
// src/router/routes.ts

// with a fallback route
{
    path: "/your/route",
    component: () => import("../pages/your.page.vue"),
    name: "yourRouteName",
    beforeEnter: createPermissionGuard(["permission_1"], "/yourFallBackRoute"),
},

// without a fallback,
// it shows a '401' file if the user doesn't have permissions
{
    path: "/your/route",
    component: () => import("../pages/your.page.vue"),
    name: "yourRouteName",
    beforeEnter: createPermissionGuard(["permission_1", "permission_2"]),
},

```

### <a name='Exceptionhandling'></a>Exception handling

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

*Also look here: [Meeting Notes 2022-11-25](https://docs.dbildungscloud.de/x/joL4DQ)*

### <a name='inject-fallbackthrowinganerror'></a>inject - fallback throwing an error

> We want to provide a simple factory function that produces a unique, identifiable error, if an inject fails and we want to avoid adding code to your TypeScript-components only to prevent linter errors.
> The topic will be implemented with this ticket: [Jira - BC-2813](https://ticketsystem.dbildungscloud.de/browse/BC-2813). It contains a lot of details on that issue.
>
> ... Details should be added here. soon...

*Also look here: Frontend Arc Group: Meeting Notes 2022-12-02*





// TODO: check all meeting notes older than 2022-10-14