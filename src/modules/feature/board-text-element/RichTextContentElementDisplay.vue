<template>
	<RenderHTML
		v-if="value !== undefined && value !== ''"
		class="ck-content pb-2"
		:html="value"
	/>
</template>

<script setup lang="ts">
import { RenderHTML } from "@feature-render-html";

defineProps({
	value: {
		type: String,
		required: true,
	},
});
</script>

<style lang="scss" scoped>
.margin {
	margin: 0.9em 0;
}

.margin:first-child {
	margin-top: 0;
}
</style>
