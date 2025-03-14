<template>
	<div ref="ghostColumnRef" :class="{ 'h-100 pl-4 pr-6': !isListBoard }">
		<BoardSectionCreationHeader
			:label="title"
			:isColumnActive="isColumnHovered"
			@add-column="onAddColumn"
			data-testid="add-column"
		/>
		<div
			:style="{ 'min-width': colWidth + 'px' }"
			class="grow-transition"
			:class="{ 'mr-4 sortable-container': !isListBoard }"
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
		classes.push("column-container", "ml-n4", "pl-2");
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

/* Subtracted is the height of the column-header. */
.sortable-container {
	height: calc(100% - 77px);
}

/**
 * This rule extends the droppable area of columns.
 * Without this rule cards have to be placed closely below the last card in a column to be added.
*/
.column-container {
	height: 100%;
	padding-bottom: 50px;
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
