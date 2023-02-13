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

We are using a generator script to create classes to access the Schulcloud-Backend-API - V3 (so Legacy-Backend endpoints (aka V1) are not covered).
These generated classes and methods internally use axios to request data and use generated types - both for the input to the methods and for the returned types.

> **HINT**
>
> Please use the generated types in your stores and do not redefine the same types. This way consistency between Server and Api-Access stays stable.


### Regenerating the clients

Only if the server-api or the filestore-api has changed, you need to regenerate them using the following npm-scripts:

For generating the files to access the **server-api** please use:

```shell
npm run generate-client:server
```

The same is implemented for generating the backend-api to our filestore-backend.

For generating the files to access the **filestore-api** please use:

```shell
npm run generate-client:filestorage
```

> **Hint**
>
> For regenerating the clients you need an up-to-date running backend-server running in your environment.

### Using the generated api

The generated APIs can easily be used. Examples can be seen in any current store-implementation - like here:

```TypeScript
src/store/share-course.ts:

import {
	ShareTokenApiFactory,
	ShareTokenApiInterface,
	ShareTokenBodyParams,
	ShareTokenBodyParamsParentTypeEnum,
	ShareTokenResponse,
} from "../serverApi/v3/api";

...

export default class ShareCourseModule extends VuexModule {
	...
	private get shareApi(): ShareTokenApiInterface {
		return ShareTokenApiFactory(undefined, "v3", $axios);
	}

	@Action
	async createShareUrl(
		payload: SharePayload
	): Promise<ShareTokenResponse | undefined> {
		const shareTokenPayload: ShareTokenBodyParams = {
			parentType: ShareTokenBodyParamsParentTypeEnum.Courses,
			parentId: this.courseId,
			expiresInDays: payload.hasExpiryDate ? 21 : null,
			schoolExclusive: payload.isSchoolInternal,
		};
		...
		const shareTokenResult =
			await this.shareApi.shareTokenControllerCreateShareToken(
				shareTokenPayload
			);
		...
	}
    ...
}

```



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

