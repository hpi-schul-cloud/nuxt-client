<template>
	<div>
		<VTooltip
			:open-on-hover="isOverflowingLongText"
			location="top"
			origin="auto"
			transition="fade"
			:max-width="tooltipWidth"
		>
			<template #activator="{ props }">
				<div v-bind="props" ref="textElement" class="fit-content text-truncate">
					<slot />
				</div>
			</template>
			<div class="overflow-hidden base-2">
				{{ tooltipText }}
			</div>
		</VTooltip>
	</div>
</template>

<script setup lang="ts">
import { useResizeObserver } from "@vueuse/core";
import { computed, onMounted, ref, useTemplateRef } from "vue";

const textElement = useTemplateRef<HTMLDivElement>("textElement");

const isOverflowingLongText = ref<boolean>(false);

let tooltipWidth = "320px";
const tooltipText = computed<string>(() => textElement.value?.innerText ?? "");

const checkOverflow = () => {
	if (textElement.value) {
		isOverflowingLongText.value =
			textElement.value.offsetWidth < textElement.value.scrollWidth;
		tooltipWidth = `${textElement.value.offsetWidth * 0.8}px`;
	}
};

useResizeObserver(textElement, () => {
	checkOverflow();
});

onMounted(() => {
	checkOverflow();
});
</script>

<style lang="scss" scoped>
.overflow-hidden {
	overflow: hidden;
}

.fit-content {
	max-width: fit-content;
}
</style>
