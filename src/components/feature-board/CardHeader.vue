<template>
	<div>
		<div>
			<slot name="title"></slot>
		</div>
		<slot name="menu"></slot>
	</div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
	name: "CardHeader",
});
</script>
