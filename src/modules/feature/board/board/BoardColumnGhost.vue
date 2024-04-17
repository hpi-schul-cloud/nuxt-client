<template>
	<div ref="ghostColumnRef" class="pl-2">
		<BoardColumnGhostHeader
			:isColumnActive="isColumnHovered"
			:isListBoard="props.isListBoard"
			@add-column="onAddColumn"
			data-testid="add-column"
		/>
		<div
			:style="{ 'min-width': colWidth + 'px' }"
			class="column-drag-handle grow-transition mr-4"
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
					ghostClass: 'sortable-drag-ghost',
					easing: 'cubic-bezier(1, 0, 0, 1)',
					dragClass: 'sortable-drag-board-card',
					dragoverBubble: false,
					draggable: '.draggable',
					animation: 150,
					scroll: true,
					forceFallback: true,
					bubbleScroll: true,
				}"
				:class="ghostColumnStyle"
			/>
		</div>
	</div>
</template>
<script setup lang="ts">
import { useElementHover } from "@vueuse/core";
import { computed, ref } from "vue";
import BoardColumnGhostHeader from "./BoardColumnGhostHeader.vue";
import { Sortable } from "sortablejs-vue3";
import { useDragAndDrop } from "../shared/DragAndDrop.composable";

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

const ghostColumnStyle = computed(() => {
	const classes = ["d-flex", "flex-row", "flex-shrink-1", "ml-n4", "pl-2"];
	if (!props.isListBoard) {
		classes.push("column-container");
	} else {
		classes.push("list-container");
	}
	return classes;
});
</script>

<style scoped>
.grow-transition {
	transition: min-width 200ms;
}

/**
 * This rule extends the droppable area of columns.
 * Without this rule cards have to be placed closely below the last card in a column to be added.
*/
.column-container {
	min-height: 70vh;
	height: 100%;
	padding-bottom: 50px;
}

.list-container {
	min-height: 8rem;
	height: 100%;
	padding-bottom: 50px;
}

.expanded-column {
	min-height: 75vh;
}
</style>

<style>
.sortable-drag-ghost {
	width: 350px !important;
}
</style>
