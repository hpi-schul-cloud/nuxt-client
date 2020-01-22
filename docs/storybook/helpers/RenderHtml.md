# RenderHtml

## Render Components

By default, this component can only render plain HTML and all globally mounted components. But you can extend it.

In this example, we allow the `DropdownMenuMintEc` Component to be rendered.

```vue
<!-- RenderHtmlDropdown.vue -->

<script>
import RenderHtml from "./RenderHtml";
import DropdownMenuMintEc from "@components/organisms/DropdownMenuMintEc";
export default {
	components: {
		DropdownMenuMintEc,
	},
	...RenderHtml,
};
</script>
```

This component can now render the DropdownMenuMintEc Component:

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
			html: `<dropdown-menu-mint-ec />`
		}
	}
}
</script>
```
