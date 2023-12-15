<template>
	<div
		class="content-element-title subtitle-1 font-weight-bold flex-grow-1"
		data-testid="content-element-title"
		ref="oneLineTitle"
	>
		<v-tooltip
			top
			start
			origin="auto"
			open-delay="300"
			close-delay="300"
			transition="fade"
			content-class="content-element-tooltip"
			v-if="isOverflowingLongText"
		>
			<template v-slot:activator="{ on, attrs }">
				<div v-bind="attrs" v-on="on">
					<slot />
				</div>
			</template>
			<div>
				<slot />
			</div>
		</v-tooltip>
		<template v-else>
			<slot />
		</template>
	</div>
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

<style lang="scss" scoped>
.content-element-title.subtitle-1 {
	-webkit-text-overflow: ellipsis;
	-o-text-overflow: ellipsis;
	text-overflow: ellipsis;
	text-rendering: optimizelegibility;
	overflow: hidden;
	font-family: var(--font-accent) !important;
	font-size: 14px;
	font-weight: 400;
	line-height: 1.4;
	letter-spacing: 0.02px;
	text-wrap: nowrap;
	white-space: nowrap;
	color: var(--v-black-base);
	box-sizing: border-box;
}
.content-element-tooltip {
	display: block;
	border-radius: 4px;
	padding: 8px;
	font-family: var(--font-primary) !important;
	font-size: 14px;
	font-weight: 100;
	line-height: 18px;
	width: 320px;
	color: white !important;
	background: map-get($grey, darken-3);
	opacity: 1;
	text-wrap: wrap;
	overflow: visible;
	overflow-wrap: break-word;
	white-space: normal;
	box-sizing: border-box;
}
</style>

<style lang="scss">
.v-application .content-element-tooltip a {
	color: white !important;
	text-decoration: none;
}
.v-application .content-element-title a {
	color: var(--v-black-base) !important;
	text-decoration: none;
}
</style>
