# How to get data from our backend <Badge text="WIP" type="warn"/>

Getting and Sending data is pretty simple and works completely over sockets.

However, custom API requests to the server's REST interface are made with Axios.

[[toc]]

## Structure

There are basically 3 different layers where the data is flowing between.

### Nuxt Client

In our `pages` and `components` we have This is basically everything that happens in our . We are using `this.$store.dispatch` to manipulate the store.

### Vuex Store

The Vuex store is the place where the `state` of the web application is. Inside the `state` you can save everything that you want to be accessible from everywhere. In order to manipulate the state you have to use `actions` and `mutations`. In order to get the data from the state you can access the `state` directly or use `getters` which are more convenient in many cases.

#### Modules

However the state can get very complex because we have different models like schools, teams, courses, etc. The solution for this problem are `modules`. A `module` is a subset of the store and has it's own `state, actions, mutations and getters`.

You can define new modules inside the `store/index.js`

#### Actions

The actions are methods inside

#### Getters

#### Mutations

### Backend

### Example

## CRUD

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

### Patch

```js
await this.$store.dispatch("news/patch", [
	this.$route.params.id,
	{
		name: this.news.name,
		content: this.news.content,
	},
]);
```

### Delete

### Find

## Reactivity

If the list should be reactively updated, use get together with a computed property instead of list.

**Problem:** The 'list' getter itself is not reactive.

**Example:** [pull request](https://github.com/schul-cloud/nuxt-client/pull/12)

**Explanation:** [https://feathers-plus.github.io/v1/feathers-vuex/service-module.html#The-find-action](https://feathers-plus.github.io/v1/feathers-vuex/service-module.html#The-find-action)

![image](https://user-images.githubusercontent.com/3246782/52415495-10aa7600-2b22-11e9-8116-0da8a3150659.png)

**Why is it like that?** The reason for that is that the all the requests results are stored in the store so after that they can be separately fetched. _Example:_ If I search for "Mathe" the results are stored in the store. If I search for "Deutsch" the results are also stored. But the 'list' getter has now both results, Mathe and Deutsch. If I search now for 'Mathe' again, we get immediate results because the results are already in the store.

As a solution there is the 'find' getter which makes a local query against the store. Unfortunately it doesn't seem to work with \_all[$match].

**Solution** Until now, this solution is working and doesn't generate more requests because the data is fetched from the store. We get the current results from pagination.ids and map the IDs to the individual results.

```js
import { mapGetters, mapState } from "vuex";

export default {
	computed: {
		...mapGetters("content_search", {
			getContent: "get",
			fetchContent: "find",
		}),
		...mapState("content_search", {
			pagination: (state) => {
				return state.pagination.content_list;
			},
		}),
		searchResults() {
			const { $store, getContent, pagination } = this;

			if (pagination) {
				return pagination.ids.map((id) => getContent(id));
			}

			return [];
		},
	},
};
```

- Getting the list of results from the content_search getter
- Getting the pagination from the content_search state

## Custom API Requests
