<template>
	<div ref="ghostColumnRef">
		<BoardColumnGhostHeader
			ref="ghostColumnTitleRef"
			:isColumnActive="isColumnActive"
			@add-column="onAddColumn"
		></BoardColumnGhostHeader>
		<div
			:style="{ 'min-width': colWidth + 'px', 'max-width': colWidth + 'px' }"
			class="column-drag-handle grow-transition mr-4"
			style="min-height: 500px"
		>
			<Container
				v-if="isDragging"
				group-name="cards"
				@drop="onDropCard"
				@drag-enter="onDragEnter"
				@drag-leave="onDragLeave"
				drag-class="elevation-12"
				drop-class="elevation-0"
				:drop-placeholder="cardDropPlaceholderOptions"
				class="dndrop-container vertical"
				:class="{ 'expanded-column': isDragging }"
			>
			</Container>
		</div>
	</div>
</template>
<script lang="ts">
import { useElementHover, useFocusWithin } from "@vueuse/core";
import { computed, defineComponent, ref } from "vue";
import { useDragAndDrop } from "../shared/DragAndDrop.composable";
import {
	CardMove,
	cardDropPlaceholderOptions,
} from "@/types/board/DragAndDrop";
import BoardColumnGhostHeader from "./BoardColumnGhostHeader.vue";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { Container } = require("vue-dndrop");

export default defineComponent({
	name: "BoardColumnGhost",
	components: { Container, BoardColumnGhostHeader },
	emits: ["create:column", "create:column-with-card"],
	setup(props, { emit }) {
		const isDragPending = ref<boolean>(false);
		const { isDragging } = useDragAndDrop();

		const ghostColumnRef = ref<HTMLDivElement | undefined>();
		const ghostColumnTitleRef = ref<HTMLElement | undefined>();

		const isTitleHovered = useElementHover(ghostColumnTitleRef);
		const { focused } = useFocusWithin(ghostColumnRef);

		const isColumnActive = computed<boolean>(
			() => isTitleHovered.value || focused.value || isDragPending.value
		);
		const colWidth = computed<number>(() => (isColumnActive.value ? 340 : 200));

		const onDropCard = (card: CardMove) => {
			if (card.addedIndex === null) return;
			emit("create:column-with-card", card.payload.cardId);
		};
		const onAddColumn = () => {
			emit("create:column");
		};

		const onDragEnter = () => {
			isDragPending.value = true;
		};
		const onDragLeave = () => {
			isDragPending.value = false;
		};

		return {
			onDropCard,
			onDragEnter,
			onDragLeave,
			onAddColumn,
			colWidth,
			cardDropPlaceholderOptions,
			isColumnActive,
			isDragging,
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
.smooth-dnd-container.vertical {
	min-height: 70vh;
	height: 100%;
	padding-bottom: 50px;
}

.expanded-column {
	min-height: 75vh;
}
</style>
