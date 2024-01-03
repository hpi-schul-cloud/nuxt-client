<template>
	<div ref="textElement" class="line-clamp">
		<v-tooltip
			top
			start
			origin="auto"
			transition="fade"
			:max-width="tooltipWidth"
			v-if="isOverflowingLongText"
		>
			<template v-slot:activator="{ on, attrs }">
				<div v-bind="attrs" v-on="on" class="text-truncate">
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
	name: "LineClamp",
	setup: () => {
		const textElement: Ref<HTMLElement | undefined> = ref(undefined);
		const isOverflowingLongText = ref(false);
		let tooltipWidth = "320px";

		onMounted(() => {
			if (textElement.value) {
				isOverflowingLongText.value =
					textElement.value.offsetWidth < textElement.value.scrollWidth;
				tooltipWidth = `${textElement.value.offsetWidth * 0.8}px`;
			}
		});

		return {
			isOverflowingLongText,
			textElement,
			tooltipWidth,
		};
	},
});
</script>

<style lang="scss" scoped>
.line-clamp {
	overflow: hidden;
	white-space: nowrap;
}
</style>
