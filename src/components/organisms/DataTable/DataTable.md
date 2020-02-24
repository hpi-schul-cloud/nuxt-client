# DataTable

The DataTable should used whenever you need to display data in an organized way and have all the data to display available. If you want to display data from the backend you should consider using the BackendDataTable which supports showing only parts of the data so you do not need to fetch everything in advance.

## Features

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
