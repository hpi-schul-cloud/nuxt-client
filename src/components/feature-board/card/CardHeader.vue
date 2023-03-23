<template>
	<VCardTitle class="d-flex align-start justify-space-between">
		<slot name="title"></slot>
		<div class="ml-4">
			<slot name="menu"></slot>
		</div>
	</VCardTitle>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
	name: "CardHeader",
});
</script>
