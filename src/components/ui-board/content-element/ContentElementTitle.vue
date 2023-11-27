<template>
	<span
		class="content-element-title subtitle-1 font-weight-bold"
		data-testid="content-element-title"
	>
		<slot />
	</span>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
	name: "ContentElementTitle",
});
</script>

<style type="text/scss">
.content-element-title.subtitle-1 {
	text-overflow: ellipsis;
	text-rendering: optimizelegibility;
	text-wrap: nowrap;
	overflow: hidden;
	font-family: var(--font-primary);
	font-size: 14px;
	font-weight: 400;
	line-height: 24px;
	letter-spacing: 0.02px;
	color: var(--v-black-base);
}
</style>
