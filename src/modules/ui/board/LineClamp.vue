<template>
	<div ref="textElement" class="line-clamp">
		<v-tooltip
			location="top"
			origin="auto"
			transition="fade"
			:max-width="tooltipWidth"
			v-if="isOverflowingLongText"
		>
			<template v-slot:activator="{ props }">
				<div v-bind="props" class="text-truncate">
					<slot />
				</div>
			</template>
			<div class="overflow-hidden base-2">
				{{ tooltipText }}
			</div>
		</v-tooltip>
		<template v-else>
			<slot />
		</template>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from "vue";

export default defineComponent({
	name: "LineClamp",
	setup: () => {
		const textElement = ref<HTMLDivElement | undefined>(undefined);
		const isOverflowingLongText = ref<boolean>(false);
		let tooltipWidth = "320px";
		const tooltipText = computed<string>(
			() => textElement.value?.innerText ?? ""
		);

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
			tooltipText,
		};
	},
});
</script>

<style lang="scss" scoped>
.line-clamp {
	overflow: hidden;
	white-space: nowrap;
}

.overflow-hidden {
	overflow: hidden;
}
</style>
