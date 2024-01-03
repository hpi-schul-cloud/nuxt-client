<template>
	<div
		class="content-element-title subtitle-1 font-weight-bold flex-grow-1"
		data-testid="content-element-title"
		ref="oneLineTitle"
	>
		<LineClamp>
			<slot />
		</LineClamp>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref, Ref, onMounted } from "vue";
import LineClamp from "./LineClamp.vue";

export default defineComponent({
	name: "ContentElementTitle",
	components: { LineClamp },
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
	font-family: var(--font-accent) !important;
	line-height: 1em;
	color: var(--v-black-base);
	overflow: hidden;
}
</style>
