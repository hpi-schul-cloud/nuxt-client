<template>
	<div
		class="line-drag-handle d-flex flex-column flex-shrink-1 rounded mb-4"
		:style="{ backgroundColor: lineBackgroundColorHex }"
		:data-line-id="availableMediaLineId"
		data-testid="available-line"
	>
		<div class="line-header rounded">
			<div class="d-flex align-center py-2 px-4">
				<span class="w-100 title">
					{{ $t("feature.media-shelf.availableLine.title") }}
				</span>
				<MediaBoardLineMenu
					v-model:collapsed="collapsed"
					:color="line.backgroundColor"
					@update:color="$emit('update:line-background-color', $event)"
				/>
			</div>
			<VDivider aria-hidden="true" class="border-opacity-100" color="black" />
		</div>
		<VExpansionPanels v-model="openItems">
			<VExpansionPanel value="availableLinePanel" elevation="0" class="pa-0 bg-transparent">
				<VExpansionPanelText class="no-inner-padding">
					<Sortable
						:list="elements"
						item-key="id"
						tag="div"
						:options="{
							group: 'elements',
							direction: 'horizontal',
							delay: 200,
							delayOnTouchOnly: true,
							ghostClass: 'sortable-drag-ghost',
							easing: 'cubic-bezier(1, 0, 0, 1)',
							chosenClass: isDesktop ? '' : 'sortable-chosen',
							dragoverBubble: true,
							animation: 250,
							scroll: true,
							forceFallback: true,
							bubbleScroll: true,
							sort: false,
						}"
						class="d-flex flex-grid flex-shrink-1 py-4 px-6 ga-6 flex-1-1 scrollable-line"
						data-testid="available-media-line-space"
						:class="{ 'flex-wrap': !isList }"
						@start="dragStart"
						@end="onElementDragEnd"
					>
						<template #item="{ element }">
							<MediaBoardAvailableElement :key="uniqueId()" :element="element" />
						</template>
					</Sortable>
				</VExpansionPanelText>
			</VExpansionPanel>
		</VExpansionPanels>
	</div>
</template>

<script setup lang="ts">
import { availableMediaLineId, ElementCreate } from "./data";
import MediaBoardAvailableElement from "./MediaBoardAvailableElement.vue";
import MediaBoardLineMenu from "./MediaBoardLineMenu.vue";
import { MediaBoardColorMapper, useCollapsableState } from "./utils";
import {
	BoardLayout,
	MediaAvailableLineElementResponse,
	MediaAvailableLineResponse,
	MediaBoardColors,
} from "@/serverApi/v3";
import { DeviceMediaQuery } from "@/types/enum/device-media-query.enum";
import { extractDataAttribute, useDragAndDrop } from "@util-board";
import { useMediaQuery } from "@vueuse/core";
import { uniqueId } from "lodash-es";
import { SortableEvent } from "sortablejs";
import { Sortable } from "sortablejs-vue3";
import { computed, ComputedRef, PropType, Ref, WritableComputedRef } from "vue";

const props = defineProps({
	line: {
		type: Object as PropType<MediaAvailableLineResponse>,
		required: true,
	},
	layout: {
		type: String as PropType<BoardLayout>,
		required: true,
	},
});

const emit = defineEmits<{
	(e: "create:element", value: ElementCreate): void;
	(e: "update:line-background-color", value: MediaBoardColors): void;
	(e: "update:line-collapsed", value: boolean): void;
}>();

const isDesktop: Ref<boolean> = useMediaQuery(DeviceMediaQuery.Desktop);

const collapsed: WritableComputedRef<boolean> = computed({
	get() {
		return props.line?.collapsed;
	},
	set(value: boolean) {
		emit("update:line-collapsed", value);
	},
});

const { openItems } = useCollapsableState("availableLinePanel", collapsed);

const { dragStart, dragEnd } = useDragAndDrop();

const elements: ComputedRef<MediaAvailableLineElementResponse[]> = computed(() => props.line.elements ?? []);

const isList: Ref<boolean> = computed(() => props.layout === BoardLayout.List);

const lineBackgroundColorHex: Ref<string> = computed(() =>
	MediaBoardColorMapper.mapColorToHex(props.line.backgroundColor, "lighten5")
);

const onElementDragEnd = async (event: SortableEvent) => {
	dragEnd();

	const { newIndex, oldIndex, to, from, item } = event;

	const fromLineId: string | undefined = extractDataAttribute(from, "lineId");
	const toLineId: string | undefined = extractDataAttribute(to, "lineId");

	const isOutOfBounds =
		fromLineId === toLineId ||
		newIndex === undefined ||
		oldIndex === undefined ||
		oldIndex < 0 ||
		oldIndex > elements.value.length - 1;

	if (isOutOfBounds) {
		return;
	}

	const media: MediaAvailableLineElementResponse = elements.value[oldIndex];

	item?.parentNode?.removeChild(item);

	const elementCreate: ElementCreate = {
		toLineId,
		oldElementIndex: oldIndex,
		newElementIndex: newIndex,
		schoolExternalToolId: media.schoolExternalToolId,
	};

	emit("create:element", elementCreate);
};
</script>

<style scoped>
.title {
	font-size: var(--heading-3) !important;
	font-family: var(--font-accent);
}
</style>
