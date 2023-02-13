# HowTo

Collection of instructions on how to do certain things:

<!-- vscode-markdown-toc -->
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

## <a name='FeatureFlags'></a>Feature Flags

If there is a new functionality that should only be available on certain systems, we introduce new FEATURE-Flags into the SchulCloud-Backend and into the dof-repository, that contains the configuration for all our instances.

Our Vue-Frontend requests all FEATURE-flags and provides global access to them by using this code (example):

```TypeScript
import { envConfigModule } from "@/store";
if (envConfigModule.getEnv.FEATURE_COPY_SERVICE_ENABLED) {
    ...
}
```

## <a name='UsinggeneratedAPIanditstypes'></a>Using generated API and it's types

// TODO: WRITE THIS BEFORE MERGE

## <a name='User-PermissionsonPages'></a>User-Permissions on Pages

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

## <a name='Exceptionhandling'></a>Exception handling

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

## <a name='inject-fallbackthrowinganerror'></a>inject - fallback throwing an error

> We want to provide a simple factory function that produces a unique, identifiable error, if an inject fails and we want to avoid adding code to your TypeScript-components only to prevent linter errors.
> The topic will be implemented with this ticket: [Jira - BC-2813](https://ticketsystem.dbildungscloud.de/browse/BC-2813). It contains a lot of details on that issue.
>
> ... Details should be added here. soon...

*Also look here: Frontend Arc Group: Meeting Notes 2022-12-02*

