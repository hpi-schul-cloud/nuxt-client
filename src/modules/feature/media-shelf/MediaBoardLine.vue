<template>
	<div
		class="position-relative line-drag-handle d-flex flex-column flex-shrink-1 rounded"
		:style="{ backgroundColor: line.backgroundColor }"
	>
		<MediaBoardLineHeader
			:title="line.title"
			:title-placeholder="titlePlaceholder"
			:line-id="line.id"
			@update:title="$emit('update:line-title', $event)"
			data-testid="media-board-line-header"
		>
			<template #menu>
				<MediaBoardLineMenu
					:line-id="line.id"
					v-model:collapsed="collapsed"
					@delete:line="$emit('delete:line', $event)"
					@update:color="$emit('update:line-background-color', $event)"
				/>
			</template>
		</MediaBoardLineHeader>
		<VExpansionPanels v-model="openItems">
			<VExpansionPanel
				value="linePanel"
				elevation="0"
				class="pa-0 bg-transparent"
			>
				<VExpansionPanelText class="no-inner-padding">
					<Sortable
						:list="line.elements"
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
						}"
						class="d-flex flex-grid flex-shrink-1 py-4 px-6 ga-6 flex-1-1 scrollable-line"
						@start="dragStart"
						@end="onElementDragEnd"
					>
						<template #item="{ element }">
							<MediaBoardExternalToolElement
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
import { MediaLineResponse } from "@/serverApi/v3";
import { DeviceMediaQuery } from "@/types/enum/device-media-query.enum";
import { useDragAndDrop } from "@feature-board/shared/DragAndDrop.composable";
import { extractDataAttribute } from "@util-board";
import { useMediaQuery } from "@vueuse/core";
import { SortableEvent } from "sortablejs";
import { Sortable } from "sortablejs-vue3";
import { computed, ComputedRef, PropType, Ref } from "vue";
import { useI18n } from "vue-i18n";
import { availableMediaLineId, ElementMove } from "./data";
import MediaBoardExternalToolElement from "./MediaBoardExternalToolElement.vue";
import MediaBoardLineHeader from "./MediaBoardLineHeader.vue";
import MediaBoardLineMenu from "./MediaBoardLineMenu.vue";
import { useCollapsableState } from "./utils/collapsable.composable";

const props = defineProps({
	line: {
		type: Object as PropType<MediaLineResponse>,
		required: true,
	},
	index: {
		type: Number,
		required: true,
	},
});

const emit = defineEmits<{
	(e: "update:line-title", newTitle: string): void;
	(e: "update:line-background-color", color: string): void;
	(e: "update:element-position", value: ElementMove): void;
	(e: "delete:line", lineId: string): void;
	(e: "delete:element", elementId: string): void;
}>();

const { t } = useI18n();

const isDesktop: Ref<boolean> = useMediaQuery(DeviceMediaQuery.Desktop);

const { collapsed, openItems } = useCollapsableState("linePanel");

const { dragStart, dragEnd } = useDragAndDrop();

const titlePlaceholder: ComputedRef<string> = computed(
	() => `${t("feature.media-shelf.line.title").toString()} ${props.index + 1}`
);

const onElementDragEnd = async (event: SortableEvent) => {
	dragEnd();

	const { newIndex, oldIndex, to, from, item } = event;

	const fromLineId: string | undefined = extractDataAttribute(from, "lineId");
	const toLineId: string | undefined = extractDataAttribute(to, "lineId");
	const elementId: string | undefined = extractDataAttribute(item, "elementId");

	if (
		newIndex === undefined ||
		oldIndex === undefined ||
		fromLineId === undefined ||
		elementId === undefined
	) {
		return;
	}

	if (toLineId !== fromLineId) {
		item?.parentNode?.removeChild(item);
	}

	if (toLineId === availableMediaLineId) {
		emit("delete:element", elementId);
	} else {
		const elementMove: ElementMove = {
			elementId,
			oldElementIndex: oldIndex,
			newElementIndex: newIndex,
			fromLineId,
			toLineId,
		};

		emit("update:element-position", elementMove);
	}
};
</script>
