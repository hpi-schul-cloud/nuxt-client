# How to with our backend <Badge text="WIP" type="warn"/>

For communication with the backend, we use the VueJS extension Vuex which is already part of NuxtJS.

The big advantage of this is, that our API requests are abstracted in services instead of accessing the REST API directly. So if the backend should change we don't have to change all the code in our pages and components, just in the services.

[[toc]]

## Structure

There are basically 3 different components of the Vuex Store. Actions, Mutations and Getters.

### Nuxt Client

In our `pages` and `components` we have This is basically everything that happens in our . We are using `this.$store.dispatch` to manipulate the store.

### Vuex Store

The Vuex store is the place where the `state` of the web application is located. Inside the `state` you can save everything that you want to be accessible from everywhere. In order to manipulate the state you have to use `actions` to fetch the data from the APIs and `mutations` which actually change the state. In order to get the data from the state you can access the `state` directly or use `getters` which are more convenient in many cases.

#### Modules

However the state can get very complex because we have different models like schools, teams, courses, etc. So one giant state would be not appropriate. The solution for this problem are `modules`. A `module` is a subset of the store and has it's own `state, actions, mutations and getters`.

To register a new service we just have to create a new file with the service name into the src/store folder. This will automatically create a service with its own namespace based on the filename.


## Feathers REST Template

If a service uses our default backend, we use this service template located in this directory: `src/utils/service-template.js`

## Example for creating a service

Let's say we want to make n user service for our feathers /news REST API. So we just create this file: `src/store/news.js`

With this content:

```js
import serviceTemplate from "../utils/service-template";
const base = serviceTemplate("news");

const module = {
	...base,
};

export default module;
```

This will take the service-template.js and provides the endpoint name "news".

## Extending or overriding the template

If we have custom service actions, mutations, getters or we want to extend the state we can extend the template using the mergeDeep util. This way we can add additional actions, getters, mutations and also a custom state.

```js
import mergeDeep from "../utils/merge-deep";
import serviceTemplate from "../utils/service-template";
const base = serviceTemplate("teams");

const module = mergeDeep(base, {
	actions: {
		acceptInvitation: async function(ctx, teamId) {
			return this.$axios.$get("/teams/extern/accept/" + teamId);
		}
	},
	getters: {
		hasTeamPermission: (_state, localGetters) => (permission) => {
			return localGetters.current.user
				? localGetters.current.user.permissions.find((p) => p === permission)
				: false;
		},
	}
})
```

## CRUD

This paragraph shows how to use the services to make simple CRUD operations.

### Create

```js
const news = await this.$store.dispatch("news/create", [
	{
		title: this.news.title,
		content: this.news.content,
		schoolId: this.$user.schoolId,
		target: this.$route.query.target,
		targetModel: this.$route.query.Model,
	},
]);
```

### Update

```js
await this.$store.dispatch("news/update", [
	id,
	{
		title: this.news.newTitle,
		content: this.news.content,
		schoolId: this.$user.schoolId,
		target: this.$route.query.target,
		targetModel: this.$route.query.Model,
	},
]);
```

### Patch

```js
await this.$store.dispatch("news/patch", [
	id,
	{
		name: this.news.name,
		content: this.news.content,
	},
]);
```

### Delete

```js
await this.$store.dispatch("news/remove", id);
```

### Find

```js
await this.$store.dispatch("news/find", {
	query: {
		$sort: {
			createdAt: -1,
		},
	},
});
```
