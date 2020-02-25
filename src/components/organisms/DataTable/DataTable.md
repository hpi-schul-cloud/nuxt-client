# DataTable

The DataTable should used whenever you need to display data in an organized way and have all the data to display available. If you want to display data from the backend you should consider using the BackendDataTable which supports showing only parts of the data so you do not need to fetch everything in advance.

## Basic Usage

To use the datatable you have to specify the following props:

### `data` (required)

The `data` prop must be a flat Array of Objects with undefined structure. You can pass in whatever you like. Which data of this object will be shown can be declared with the `columns` prop.

### `columns` (required)

The columns prop declares the coloumns that the table will show. It must be an Array of Objects with the following Schema:

```js
const columns = [
	{
		label: String, // required
		field: String,
		sortable: Boolean,
	},
	// ...
];
```

The `label` value will be displayed in the table head. If you set `sortable` to `true`, the user can sort the data by this column by clicking on the table head. More details on sorting can be found in the optional features section. The `field` attribute is really important to actually show some data. It defines per column the path in the data object to access the data to be shown. In example if you have an object like `{ a: { c: "ac" }, b: "b"}` in your data, you can set `field` to `a.c` to render the value `ac` (`obj.a.c`) in the given row.

### `trackBy` (required)

The `trackBy` property is required to get a unique identifier for each data-row. It must contain an access path to an unique identifier for each object. It is required because we need to keep track which item was rendered where and also helps to identify rows later on when using features like `selection`. The path can be nested, just like in the `columns` `field` value.

## Features (optional)

### Sort

Like explained above, you can allow the user to sort by columns. By default we have a generic sort method that supports most basic data types (`String`, `Number`, `Boolean`). If that is not enough for you, you can define your own sort methos and pass it in with the `sortMethod` prop. This Method will be called with 3 arguments: `function(data, sortBy, sortOrder, utils)`. `data` is the value of the data prop, `sortBy` contains the `field` value specified for the column to sort by and `sortOrder` will be `asc` or `desc`. `utils` exposes helper functions like `getValueByPath(dataObj, path)` you could use to access the data in the object.

To keep you updated about the current sorting and to preselect some sort options there exist the props `sortBy` and `sortOrder` are provided. `sortOrder` will be either `asc` or `desc` and `sortBy` will contain the `field` value specified for the column to sort by. Both of these props are optional and support the `.sync` modifier as well as the events `@update:sort-by` and `@update:sort-order` with there value as the first argument.

### Pagination

The DataTable does support pagination. To enable it, simply set the `paginated` prop to `true`. To preselect how many items should be visible per page you can set the props `rowsPerPage` (type `Number`) and select the current page with the `currentPage` (type `Number`) prop. Both of these props support the `.sync` modifier and therefore the events `@update:rows-per-page` and `@update:current-page` to keep you informed about the current user state. But you do not need to specify those values. It will work just fine without them.

**Note:** Currently it is not possible to specify the available `items-per-page` options the user can choose from.

### Selections

If you set the prop `rowsSelectable` to true, the Table will render an additional column at the very left. This column contains checkboxes and allows the user to select entries of the table. This even works with pagination. There are some helpfull shortcuts for the user like _"select all items on current page"_ and _"select all items"_ but you don't need to care about that. The DataTable will only expose a single property `selections` to you that you can use with the `.sync` modifier to listen for selection changes. Alternatively you can listen for the `@update:selections` event. This Event will contain the new selection as the first argument. You can also use the `selections` property to pass in an initial selection.

The datastructure of a selection is a flat array that contains all the identifiers of the selected items. An identifier is the value of the row data that the `trackBy` property is referencing.

### Slots

You can customize each data coloumn field by providing a scoped Slot. The Slot will provide you the data that should be displayed as `props.data` and everything else is up to you. You can use this to style input fields as well as to extend the behaviour. In example opening a Dialog on click.

The Slot names do follow the naming schema `datacolumn-{{coloumn-key}}`. `coloumn-key` is the value you provided for the coloum as the `field` attribute in the `coloumn` prop.

**INFO: any `.` in the `field` value will be replaced by `-` in the slot name** (`field: "user.age"` => `datacolumn-user-age`)

```vue
<template>
	<DataTable>
		<template v-slot:datacolumn-user-age="{ data }">
			<span style="text-decoration: underline">
				{{ data }}
			</span>
		</template>
	</DataTable>
</template>
```
