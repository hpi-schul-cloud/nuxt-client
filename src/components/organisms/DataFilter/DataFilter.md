# DataFilter

The DataFilter provides an UI that allows the user to select filters. It filters its input data with the selected filters and emits the filtered data in an `update:filtered-data` event.

## Basic Usage

To use the DataTable you have to specify the following props:

### `data` (required)

The `data` prop must be a flat Array of Objects with an undefined structure. You can pass in whatever you like.

### `filters` (required)

An array of the possible filters. As it is passed to vue-filter-ui it the property has to follow the structure of the filter-property of [vue-filter-ui](http://docs.vue-filter-ui.surge.sh/2-Configuration.html#filter).

```js
const filters = [
	{
		title: "Items per page",
		chipTemplate: "Items per page: %1",
		required: true,
		layout: layouts.Default,
		filter: [
			{
				attribute: "$limit",
				operator: "<",
				input: inputs.Radio,
				options: [
					{ value: 25, label: "25" },
					{ value: 50, label: "50" },
					{ value: 100, label: "100" },
				],
			},
		],
	},
	// ...
];
```

The `title` value will be displayed in the dropdown menu to select the filter.

The `chipTemplate` will be displayed when the filter was selected. `%1` will be replaced by the selected value of the first attribute of the `filter`, `%2` by the selected value of the second attribute and so on.

If you set `required` to `true`, the user cannot unselect the filter once it was selected.

The `filter` property describes the filter condition. Each entry in the array describes the filter rules for one attribute of the `data`. If the `filter` array contains several items the filter will combine all conditions with a logical 'AND'. See [vue-filter-ui documentation](http://docs.vue-filter-ui.surge.sh/2-Configuration.html#filter) for an detailed explanation of the filter property.

### `activeFilters`

The `activeFilters` property can be used to select filters programmatically.

```js
const activeFilters = [
	{
		attribute: "$limit",
		operator: "<",
		value: 25,
	},
	// ...
];
```

It can contain one filter rule for each data attribute. Each rule has to specifiy the filter value and the operator.
