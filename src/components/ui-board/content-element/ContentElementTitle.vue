<template>
	<span
		class="content-element-title subtitle-1 font-weight-bold flex-grow-1"
		data-testid="content-element-title"
		ref="oneLineTitle"
	>
		<span><slot /></span>
		<span
			class="tooltiptext elevation-4 grey lighten-3"
			v-if="isOverflowingLongText"
			><slot
		/></span>
	</span>
</template>

<script lang="ts">
import { defineComponent, ref, Ref, onMounted } from "vue";

export default defineComponent({
	name: "ContentElementTitle",
	setup: () => {
		const oneLineTitle: Ref<HTMLElement | undefined> = ref(undefined);
		const isOverflowingLongText = ref(false);

		onMounted(() => {
			if (oneLineTitle.value) {
				isOverflowingLongText.value =
					oneLineTitle.value.offsetWidth < oneLineTitle.value.scrollWidth;
			}
		});
		return {
			isOverflowingLongText: isOverflowingLongText,
			oneLineTitle,
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
	font-family: var(--font-accent) !important;
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
	border-radius: 4px;
	color: var(--v-black-base);
	padding: 8px;
	margin-top: -6px;
	word-wrap: break-word;
	width: 280px;
	position: absolute;
	left: 34px;
	z-index: 1;
}
.content-element-title.subtitle-1:hover .tooltiptext {
	visibility: visible;
	overflow: auto;
	text-wrap: wrap;
	height: auto;
}
</style>
