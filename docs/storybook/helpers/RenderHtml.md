# RenderHtml

## Render Components

By default, this component can only render plain HTML and all globally mounted components. But you can extend it.

In this example, we allow the `DropdownMenu` Component to be rendered.

```vue
<!-- RenderHtmlDropdown.vue -->

<script>
import RenderHtml from "./RenderHtml";
import DropdownMenu from "@components/organisms/DropdownMenu";
export default {
	components: {
		DropdownMenu,
	},
	...RenderHtml,
};
</script>
```

This component can now render the DropdownMenu Component:

```vue
<template>
	<render-html-dropdown :html="html">
</template>

<script>
import RenderHtmlDropdown from "./RenderHtmlDropdown";

export default {
	components: {
		RenderHtmlDropdown
	},
	data(){
		return {
			html: `<dropdown-menu />`
		}
	}
}
</script>
```
