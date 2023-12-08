<template>
	<span
		class="content-element-title subtitle-1 font-weight-bold flex-grow-1"
		data-testid="content-element-title"
		ref="oneLineTitle"
	>
		<span><slot /></span>
		<span
			class="tooltip grey darken-3 text-grey-lighten-5"
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

	.tooltip {
		z-index: 1;
		height: auto;
		border-radius: 4px;
		position: absolute;
		left: 0px;
		line-height: 20px;
		font-weight: 100;
		color: white !important;
		padding: 8px 12px;
		margin: 8px;
		margin-top: 0vh;
		max-width: 95%;
		word-break: normal;
		text-wrap: pretty;
		overflow: visible;
		opacity: 0;
		transition: all 500ms 300ms ease;
		white-space: normal;
		text-align: left;
	}
}

.v-application .content-element-title.subtitle-1 a {
	color: var(--v-black-base);
}

.v-application .content-element-title.subtitle-1 .tooltip a {
	color: white;
	text-decoration: none;
}

.content-element-title:hover .tooltip,
.v-card:not(.card-host):focus .content-element-title .tooltip {
	opacity: 1;
	transition: all 500ms 300ms ease;
}
</style>
