<template>
	<div
		class="position-relative line-drag-handle d-flex flex-column flex-shrink-1 rounded mb-4"
		:style="{ backgroundColor: lineBackgroundColor2 }"
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
					v-model:color="lineBackgroundColor"
					@update:color="
						() => {
							/* TODO emit event*/
						}
					"
				/>
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
						:list="elements"
						item-key="id"
						tag="div"
						:options="{
							group: 'elements',
							direction: 'horizontal',
							delay: 300,
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
						@start="dragStart"
						@end="onElementDragEnd"
					>
						<template #item="{ element }">
							<MediaBoardAvailableElement
								:key="uniqueId()"
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
import { MediaAvailableLineElementResponse } from "@/serverApi/v3";
import { DeviceMediaQuery } from "@/types/enum/device-media-query.enum";
import { useDragAndDrop } from "@feature-board/shared/DragAndDrop.composable";
import { extractDataAttribute } from "@util-board";
import { useMediaQuery } from "@vueuse/core";
import { uniqueId } from "lodash";
import { SortableEvent } from "sortablejs";
import { Sortable } from "sortablejs-vue3";
import { computed, ComputedRef, ref, Ref } from "vue";
import {
	availableMediaLineId,
	ElementCreate,
	useSharedMediaBoardState,
} from "./data";
import { MediaBoardColors } from "./data/mediaBoardColors";
import MediaBoardAvailableElement from "./MediaBoardAvailableElement.vue";
import MediaBoardLineMenu from "./MediaBoardLineMenu.vue";
import { useCollapsableState } from "./utils/collapsable.composable";
import { MediaBoardColorMapper } from "./utils/mediaBoardColorMapper";

const emit = defineEmits<{
	(e: "create:element", value: ElementCreate): void;
}>();

const isDesktop: Ref<boolean> = useMediaQuery(DeviceMediaQuery.Desktop);

const { openItems, collapsed } = useCollapsableState("availableLinePanel");

const { dragStart, dragEnd } = useDragAndDrop();

const { availableMedia } = useSharedMediaBoardState();

const elements: ComputedRef<MediaAvailableLineElementResponse[]> = computed(
	() => availableMedia.value?.elements ?? []
);

const lineBackgroundColor: Ref<MediaBoardColors> = ref(
	MediaBoardColors.TRANSPARENT
);

const lineBackgroundColor2: Ref<string> = computed(() =>
	MediaBoardColorMapper.mapColorToHex(lineBackgroundColor.value, "lighten5")
);

const onElementDragEnd = async (event: SortableEvent) => {
	dragEnd();

	const { newIndex, oldIndex, to, from, item } = event;

	const fromLineId: string | undefined = extractDataAttribute(from, "lineId");
	const toLineId: string | undefined = extractDataAttribute(to, "lineId");

	if (
		fromLineId === toLineId ||
		newIndex === undefined ||
		oldIndex === undefined ||
		oldIndex < 0 ||
		oldIndex > elements.value.length - 1
	) {
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
	font-size: var(--heading-5) !important;
	font-family: var(--font-accent);
}
</style>
