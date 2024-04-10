<template>
	<div
		ref="textElement"
		:class="{ 'line-clamp': truncate, 'overflow-hidden': !truncate }"
	>
		<v-tooltip
			location="top"
			origin="auto"
			transition="fade"
			:max-width="tooltipWidth"
			v-if="isOverflowingLongText && displayTooltip"
		>
			<template v-slot:activator="{ props }">
				<div v-bind="props" :class="{ 'text-truncate': truncate }">
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
import { computed, ComputedRef, defineComponent, ref, watchEffect } from "vue";

export default defineComponent({
	name: "LineClamp",
	props: {
		truncate: {
			type: Boolean,
			default: true,
		},
		displayTooltip: {
			type: Boolean,
			default: true,
		},
	},
	setup: () => {
		const textElement = ref<HTMLDivElement | undefined>(undefined);
		const isOverflowingLongText: ComputedRef<boolean> = computed(() => {
			return (
				!!textElement.value &&
				(textElement.value.offsetWidth < textElement.value.scrollWidth ||
					textElement.value.offsetHeight < textElement.value.scrollHeight)
			);
		});
		let tooltipWidth = "320px";
		const tooltipText = computed<string>(
			() => textElement.value?.innerText ?? ""
		);

		watchEffect(() => {
			if (textElement.value) {
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
