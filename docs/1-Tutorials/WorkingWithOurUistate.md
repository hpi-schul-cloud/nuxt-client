# How to use: uiState

In this document you will find how to use the uiState. The uiState allows the persistence of filters and pagination. The localStorage of the browser is used as storage medium. The state is the same for all tabs and windows of a browser and is created for each user per session. (Note: the uiState is only stored locally and therefore varies from browser to browser or device to device)

[[toc]]

## How to access

All components have access to the uiState. You can access it with: `$uiState`.

## Persist pagination

### CurrentPage

<b>set currentPage</b>

```js
this.$uiState.set("pagination", "pages.administration.students.index", {
	currentPage: 1,
});
```

<b>get currentPage</b>

```js
this.$uiState.get("pagination", "pages.administration.students.index").page;
```

### ItemsPerPage

<b>set itemsPerPage</b>

```js
this.$uiState.set("pagination", "pages.administration.students.index", {
	itemsPerPage: 10,
});
```

<b>get itemsPerPage</b>

```js
this.$uiState.get("pagination", "pages.administration.students.index").limit;
```

## Persist filter

<b>set filter</b>

```js
this.$uiState.set("filter", "pages.administration.students.index", {
	query,
});
```

<b>get filter</b>

```js
this.$uiState.get("filter", "pages.administration.students.index");
```

## Persist other values

You can also save additional values. Note that you cannot overwrite the default keys (e.g.: filter, pagination, ...).

```js
this.$uiState.set("yourUniqueKey", undefined, "someValue");
```

You can regain the value with:

```js
this.$uiState.get("yourUniqueKey");
```

## Structur of localStorage

With some data:

```json
{
	"pagination": {
		"pages.administration.students.index": { "page": 2, "limit": 5 },
		"pages.administration.teachers.index": { "page": 3, "limit": 10 }
	},
	"filter": {
		"pages.administration.students.index": { "query": { "firstName": "Jack" } },
		"pages.administration.teachers.index": { "query": {} }
	},
	"version": 1
}
```
