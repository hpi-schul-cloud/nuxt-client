<template>
	<div
		class="line line-drag-handle mx-n4 px-4 py-2 ga-2 d-flex flex-column flex-shrink-1 rounded"
	>
		<div class="line-header mb-4 rounded">
			<div class="d-flex align-center py-2 px-2">
				<span class="w-100 title">
					{{ $t("feature.media-shelf.availableLine.title") }}
				</span>
			</div>
			<VDivider aria-hidden="true" class="border-opacity-100" color="black" />
		</div>
		<VExpansionPanels v-model="openItems">
			<VExpansionPanel
				value="availableLinePanel"
				elevation="0"
				class="pa-0 bg-transparent"
			>
				<VExpansionPanelText class="no-inner-padding">
					<Sortable
						:list="[]"
						item-key="id"
						tag="div"
						:options="{
							group: 'elements',
							direction: 'horizontal',
							delay: 300,
							delayOnTouchOnly: true,
							ghostClass: 'sortable-drag-ghost',
							easing: 'cubic-bezier(1, 0, 0, 1)',
							chosenClass: isMobile ? 'sortable-chosen' : '',
							dragoverBubble: true,
							animation: 250,
							scroll: true,
							forceFallback: true,
							bubbleScroll: true,
						}"
						class="d-flex flex-grid flex-shrink-1 pa-2 ga-4 flex-1-1 scrollable-line"
						@end="onElementDragEnd"
					>
						<template #item="{ element }">
							<MediaBoardElement
								:data-element-id="element.id"
								:key="element.id"
								:element="element"
							/>
						</template>
					</Sortable>
				</VExpansionPanelText>
			</VExpansionPanel>
		</VExpansionPanels>
	</div>
</template>

<script setup lang="ts">
import { DeviceMediaQuery } from "@/types/enum/device-media-query.enum";
import { extractDataAttribute } from "@util-board";
import { useMediaQuery } from "@vueuse/core";
import { SortableEvent } from "sortablejs";
import { Sortable } from "sortablejs-vue3";
import { Ref } from "vue";
import { ElementCreate } from "./data/types";
import MediaBoardElement from "./MediaBoardElement.vue";
import { useCollapsableState } from "./utils/collapsable.composable";

const emit = defineEmits<{
	(e: "create:element", value: ElementCreate): void;
}>();

const isMobile: Ref<boolean> = useMediaQuery(DeviceMediaQuery.Mobile);

const { openItems } = useCollapsableState("availableLinePanel");

const onElementDragEnd = async (event: SortableEvent) => {
	const { newIndex, oldIndex, to, item } = event;

	const toLineId: string | undefined = extractDataAttribute(to, "lineId");
	const elementId: string | undefined = extractDataAttribute(item, "elementId");

	if (toLineId !== undefined) {
		item?.parentNode?.removeChild(item);
	}

	if (
		newIndex !== undefined &&
		oldIndex !== undefined &&
		elementId !== undefined
	) {
		const elementCreate: ElementCreate = {
			toLineId,
			oldElementIndex: oldIndex,
			newElementIndex: newIndex,
		};

		emit("create:element", elementCreate);
	}
};
</script>

<style scoped>
.title {
	font-size: var(--heading-5) !important;
	font-family: var(--font-accent);
}
</style>
