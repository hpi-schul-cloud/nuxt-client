<template>
	<span
		class="content-element-title subtitle-1 font-weight-bold flex-grow-1"
		data-testid="content-element-title"
		ref="oneliner"
	>
		<span><slot /></span>
		<span class="tooltiptext elevation-8" v-if="isEllipsisActive"
			><slot
		/></span>
	</span>
</template>

<script lang="ts">
import { defineComponent, ref, Ref, onMounted } from "vue";

export default defineComponent({
	name: "ContentElementTitle",
	setup: () => {
		const oneliner: Ref<HTMLElement | undefined> = ref(undefined);
		const isEllipsisActive = ref(false);

		onMounted(() => {
			if (oneliner.value) {
				isEllipsisActive.value =
					oneliner.value.offsetWidth < oneliner.value.scrollWidth;
			}
		});
		return {
			isEllipsisActive,
			oneliner,
		};
	},
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
	white-space: nowrap;
	color: var(--v-black-base);
}

/* Tooltip text */
.content-element-title.subtitle-1 .tooltiptext {
	visibility: hidden;
	background-color: #ddd;
	color: var(--v-black-base);
	padding: 8px;
	border-radius: 6px;
	word-wrap: break-word;
	width: 280px;
	position: absolute;
	left: 34px;
	top: 8px;
	z-index: 1;
}
.content-element-title.subtitle-1:hover .tooltiptext {
	visibility: visible;
	overflow: auto;
	text-wrap: wrap;
	height: auto;
}
</style>
