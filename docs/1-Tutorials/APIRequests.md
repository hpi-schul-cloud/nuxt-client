# How to get data from our backend

[[toc]]

## find

### reactivity

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
