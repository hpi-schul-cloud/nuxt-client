<template>
	<div
		class="line line-drag-handle mx-n4 px-4 py-2 ga-2 d-flex flex-column flex-shrink-1 rounded"
	>
		<BoardLineHeader
			:title="line.title"
			:title-placeholder="titlePlaceholder"
			:line-id="line.id"
			:can-edit="true"
			@update:title="onUpdateTitle"
		>
			<template #menu>
				<MediaBoardLineMenu
					:line-id="line.id"
					v-model:collapsed="collapsed"
					@delete:line="$emit('delete:line', $event)"
				/>
			</template>
		</BoardLineHeader>
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
import { computed, ComputedRef, PropType, Ref, toRef } from "vue";
import { useI18n } from "vue-i18n";
import BoardLineHeader from "./BoardLineHeader.vue";
import { ElementMove, IMediaBoardLine } from "./data/types";
import MediaBoardElement from "./MediaBoardElement.vue";
import MediaBoardLineMenu from "./MediaBoardLineMenu.vue";
import { useCollapsableState } from "./utils/collapsable.composable";

const props = defineProps({
	line: {
		type: Object as PropType<IMediaBoardLine>,
		required: true,
	},
	index: {
		type: Number,
		required: true,
	},
});

const emit = defineEmits<{
	(e: "update:line-title", newTitle: string): void;
	(e: "update:element-position", value: ElementMove): void;
	(e: "delete:line", lineId: string): void;
}>();

const { t } = useI18n();

const isMobile: Ref<boolean> = useMediaQuery(DeviceMediaQuery.Mobile);

const { collapsed, openItems } = useCollapsableState("linePanel");

const titlePlaceholder: ComputedRef<string> = computed(
	() => `${t("feature.media-shelf.line.title").toString()} ${props.index + 1}`
);

const line: Ref<IMediaBoardLine> = toRef(props, "line");

const onUpdateTitle = (newTitle: string) => {
	emit("update:line-title", newTitle);
};

const onElementDragEnd = async (event: SortableEvent) => {
	const { newIndex, oldIndex, to, from, item } = event;

	const fromLineId: string | undefined = extractDataAttribute(from, "lineId");
	const toLineId: string | undefined = extractDataAttribute(to, "lineId");
	const elementId: string | undefined = extractDataAttribute(item, "elementId");

	if (toLineId !== fromLineId) {
		item?.parentNode?.removeChild(item);
	}

	if (
		newIndex !== undefined &&
		oldIndex !== undefined &&
		fromLineId !== undefined &&
		elementId !== undefined
	) {
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

<style>
.no-inner-padding > * {
	padding: 0;
}
</style>

<style scoped>
.line {
	position: relative;
	background-color: white;
}

.scrollable-line {
	overflow: auto hidden;
}

/* Custom Scroll Bar*/
/* height */
.scrollable-line::-webkit-scrollbar {
	height: 8px;
}

/* Track */
.scrollable-line::-webkit-scrollbar-track {
	background: white;
	border: none;
}

/* Handle */
.scrollable-line::-webkit-scrollbar-thumb {
	background-color: transparent;
	border-radius: 5px;
}
.line-drag-handle:hover .scrollable-line::-webkit-scrollbar-thumb {
	background-color: rgba(var(--v-theme-on-surface), 0.6);
	border-radius: 5px;
}

/* Handle on hover */
.scrollable-line::-webkit-scrollbar-thumb:hover {
	background: rgba(var(--v-theme-on-surface), 0.8) !important;
}
</style>
