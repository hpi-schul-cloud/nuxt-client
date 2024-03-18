<template>
	<v-hover v-model="isHovering" open-delay="200">
		<div ref="ghostColumnRef" class="pl-2">
			<BoardColumnGhostHeader
				ref="ghostColumnTitleRef"
				:isColumnActive="isColumnActive"
				@add-column="onAddColumn"
				data-testid="add-column"
			/>
			<div
				:style="{ 'min-width': colWidth + 'px' }"
				class="column-drag-handle grow-transition mr-4"
			>
				<Sortable
					v-if="isDragging"
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
					class="d-flex flex-row flex-shrink-1 ml-n4 pl-2 sortable-container vertical"
				/>
			</div>
		</div>
	</v-hover>
</template>
<script lang="ts">
import { useElementHover, useFocusWithin } from "@vueuse/core";
import { computed, defineComponent, ref } from "vue";
import { useDragAndDrop } from "../shared/DragAndDrop.composable";
import { cardDropPlaceholderOptions } from "@/types/board/DragAndDrop";
import BoardColumnGhostHeader from "./BoardColumnGhostHeader.vue";
import { Sortable } from "sortablejs-vue3";
// eslint-disable-next-line @typescript-eslint/no-var-requires

export default defineComponent({
	name: "BoardColumnGhost",
	components: { BoardColumnGhostHeader, Sortable },
	emits: ["create:column", "update:card-position"],
	setup(props, { emit }) {
		const { isDragging } = useDragAndDrop();
		const isHovering = ref(false);

		const ghostColumnRef = ref<HTMLDivElement | undefined>();
		const ghostColumnTitleRef = ref<HTMLElement | undefined>();

		const isTitleHovered = useElementHover(ghostColumnTitleRef);
		const { focused } = useFocusWithin(ghostColumnRef);

		const isColumnActive = computed<boolean>(
			() => isTitleHovered.value || focused.value
		);
		const colWidth = computed<number>(() => (isColumnActive.value ? 340 : 200));

		const onAddColumn = () => {
			emit("create:column");
		};

		return {
			onAddColumn,
			colWidth,
			cardDropPlaceholderOptions,
			isColumnActive,
			isDragging,
			isHovering,
			ghostColumnRef,
			ghostColumnTitleRef,
		};
	},
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
.sortable-container.vertical {
	min-height: 70vh;
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
