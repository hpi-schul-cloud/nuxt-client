<template>
	<div
		ref="ghostColumnRef"
		:class="{ 'h-100 pl-4 pr-6 d-flex flex-column': !isListBoard }"
	>
		<BoardSectionCreationHeader
			:label="title"
			:isColumnActive="isColumnHovered"
			@add-column="onAddColumn"
			data-testid="add-column"
		/>
		<!-- flex-grow-1 is set to expand the area where cards can be dragged in. -->
		<div
			:style="{ 'min-width': colWidth + 'px' }"
			class="grow-transition"
			:class="{ 'mr-4 flex-grow-1': !isListBoard }"
		>
			<Sortable
				:list="[]"
				item-key="cardId"
				tag="div"
				:options="{
					group: 'cards',
					direction: 'vertical',
					delay: 300, // isDesktop ? 0 : 300
					delayOnTouchOnly: true,
					ghostClass: isListBoard ? 'list-layout' : 'column-layout',
					easing: 'cubic-bezier(1, 0, 0, 1)',
					dragClass: 'sortable-drag-board-card',
					dragoverBubble: false,
					draggable: '.draggable',
					animation: 150,
					scroll: true,
					forceFallback: true,
					bubbleScroll: true,
				}"
				:class="ghostColumnClasses"
			/>
		</div>
	</div>
</template>
<script setup lang="ts">
import { BoardSectionCreationHeader } from "@ui-board";
import { useDragAndDrop } from "@util-board";
import { useElementHover } from "@vueuse/core";
import { Sortable } from "sortablejs-vue3";
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";

const ghostColumnRef = ref<HTMLDivElement | undefined>();

const props = defineProps({
	isListBoard: { type: Boolean, required: true },
});

const emit = defineEmits(["create:column", "update:card-position"]);

const isColumnHovered = useElementHover(ghostColumnRef);
const { isDragging } = useDragAndDrop();
const colWidth = computed<number>(() =>
	isColumnHovered.value && isDragging.value ? 340 : 200
);

const onAddColumn = () => emit("create:column");

const ghostColumnClasses = computed(() => {
	const classes = ["d-flex", "flex-row", "flex-shrink-1"];
	if (!props.isListBoard) {
		classes.push("h-100", "ml-n4", "pl-2");
	} else {
		classes.push("list-container");
	}
	return classes;
});

const { t } = useI18n();

const title = computed(() =>
	props.isListBoard
		? t("components.board.column.ghost.list.placeholder")
		: t("components.board.column.ghost.column.placeholder")
);
</script>

<style scoped>
.grow-transition {
	transition: min-width 200ms;
}

.list-container {
	min-height: 8rem;
	height: 100%;
	padding-bottom: 50px;
}
</style>

<style>
.column-layout {
	width: 350px !important;
}

.list-layout {
	width: 80ch !important;
}
</style>
