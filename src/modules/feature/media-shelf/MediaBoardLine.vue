<template>
	<div
		class="line-drag-handle d-flex flex-column flex-shrink-1 rounded"
		:style="{ backgroundColor: lineBackgroundColorHex }"
	>
		<MediaBoardLineHeader
			:title="line.title"
			:title-placeholder="titlePlaceholder"
			:line-id="line.id"
			:data-testid="'media-board-line-header-' + index"
			@update:title="$emit('update:line-title', $event)"
		>
			<template #menu>
				<MediaBoardLineMenu
					v-model:collapsed="collapsed"
					:line-id="line.id"
					:color="line.backgroundColor"
					@delete:line="$emit('delete:line', $event)"
					@update:color="$emit('update:line-background-color', $event)"
					@rename-title="onRenameTitle"
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
						:data-testid="'media-line-space-' + index"
						:class="{ 'flex-wrap': !isList }"
						@start="dragStart"
						@end="onElementDragEnd"
					>
						<template #item="{ element }">
							<MediaBoardExternalToolDeletedElement
								v-if="isDeletedElement(element)"
								:data-element-id="element.id"
								:element="element"
								@delete:element="onElementDelete"
							/>
							<MediaBoardExternalToolElement
								v-else
								:data-element-id="element.id"
								:element="element"
								@delete:element="onElementDelete"
							/>
						</template>
					</Sortable>
				</VExpansionPanelText>
			</VExpansionPanel>
		</VExpansionPanels>
	</div>
</template>

<script setup lang="ts">
import {
	BoardLayout,
	ContentElementType,
	DeletedElementResponse,
	MediaBoardColors,
	MediaExternalToolElementResponse,
	MediaLineResponse,
} from "@/serverApi/v3";
import { DeviceMediaQuery } from "@/types/enum/device-media-query.enum";
import { extractDataAttribute, useDragAndDrop } from "@util-board";
// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import { useMediaBoardEditMode } from "@/modules/util/board/editMode.composable"; // FIX_CIRCULAR_DEPENDENCY
import { useMediaQuery } from "@vueuse/core";
import { SortableEvent } from "sortablejs";
import { Sortable } from "sortablejs-vue3";
import {
	computed,
	ComputedRef,
	PropType,
	Ref,
	toRef,
	WritableComputedRef,
} from "vue";
import { useI18n } from "vue-i18n";
import { availableMediaLineId, ElementMove } from "./data";
import MediaBoardExternalToolDeletedElement from "./MediaBoardExternalToolDeletedElement.vue";
import MediaBoardExternalToolElement from "./MediaBoardExternalToolElement.vue";
import MediaBoardLineHeader from "./MediaBoardLineHeader.vue";
import MediaBoardLineMenu from "./MediaBoardLineMenu.vue";
import { MediaBoardColorMapper, useCollapsableState } from "./utils";

const props = defineProps({
	line: {
		type: Object as PropType<MediaLineResponse>,
		required: true,
	},
	layout: {
		type: String as PropType<BoardLayout>,
		required: true,
	},
	index: {
		type: Number,
		required: true,
	},
});

const emit = defineEmits<{
	(e: "update:line-title", newTitle: string): void;
	(e: "update:line-background-color", color: MediaBoardColors): void;
	(e: "update:line-collapsed", value: boolean): void;
	(e: "update:element-position", value: ElementMove): void;
	(e: "delete:line", lineId: string): void;
	(e: "delete:element", elementId: string): void;
}>();

const { t } = useI18n();

const isDesktop: Ref<boolean> = useMediaQuery(DeviceMediaQuery.Desktop);

const collapsed: WritableComputedRef<boolean> = computed({
	get() {
		return props.line?.collapsed;
	},
	set(value: boolean) {
		emit("update:line-collapsed", value);
	},
});

const { openItems } = useCollapsableState("linePanel", collapsed);

const { dragStart, dragEnd } = useDragAndDrop();

const { startEditMode } = useMediaBoardEditMode(toRef(props, "line").value.id);

const titlePlaceholder: ComputedRef<string> = computed(
	() => `${t("feature.media-shelf.line.title").toString()} ${props.index + 1}`
);

const isList: Ref<boolean> = computed(() => props.layout === BoardLayout.List);

const lineBackgroundColorHex: Ref<string> = computed(() =>
	MediaBoardColorMapper.mapColorToHex(props.line.backgroundColor, "lighten5")
);

const onRenameTitle = () => {
	startEditMode();
};

const onElementDelete = (elementId: string) => {
	emit("delete:element", elementId);
};

const onElementDragEnd = async (event: SortableEvent) => {
	dragEnd();

	const { newIndex, oldIndex, to, from, item } = event;

	const fromLineId: string | undefined = extractDataAttribute(from, "lineId");
	const toLineId: string | undefined = extractDataAttribute(to, "lineId");
	const elementId: string | undefined = extractDataAttribute(item, "elementId");

	const isOutOfBounds =
		newIndex === undefined ||
		oldIndex === undefined ||
		fromLineId === undefined ||
		elementId === undefined;

	if (isOutOfBounds) {
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

const isDeletedElement = (
	element: MediaExternalToolElementResponse | DeletedElementResponse
): element is DeletedElementResponse => {
	if (!("type" in element)) {
		return false;
	}
	return element.type === ContentElementType.Deleted;
};
</script>
