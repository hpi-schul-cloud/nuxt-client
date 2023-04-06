<template>
	<div ref="ghostColumnRef">
		<BoardColumnGhostHeader
			ref="ghostColumnTitleRef"
			:isColumnActive="isColumnActive"
			@add-column="onAddColumn"
		></BoardColumnGhostHeader>
		<div
			:style="{ 'min-width': colWidth + 'px', 'max-width': colWidth + 'px' }"
			class="column-drag-handle mr-4 grow-transition"
			style="min-height: 500px"
		>
			<Container
				group-name="cards"
				@drop="onDropCard"
				@drag-enter="onDragEnter"
				@drag-leave="onDragLeave"
				drag-class="elevation-12"
				drop-class="elevation-0"
				:drop-placeholder="cardDropPlaceholderOptions"
			>
			</Container>
		</div>
	</div>
</template>
<script lang="ts">
import { useElementHover, useFocusWithin } from "@vueuse/core";
import { computed, defineComponent, ref } from "vue";
import { Container } from "vue-smooth-dnd";
import { cardDropPlaceholderOptions, CardMove } from "../types/DragAndDrop";
import BoardColumnGhostHeader from "./BoardColumnGhostHeader.vue";

export default defineComponent({
	name: "BoardColumnGhost",
	components: { Container, BoardColumnGhostHeader },
	emits: ["add-empty-column", "add-column-with-card"],
	setup(props, { emit }) {
		const isDragPending = ref<boolean>(false);

		const ghostColumnRef = ref<HTMLDivElement | undefined>();
		const ghostColumnTitleRef = ref<HTMLElement | undefined>();

		const isTitleHovered = useElementHover(ghostColumnTitleRef);
		const { focused } = useFocusWithin(ghostColumnRef);

		const isColumnActive = computed<boolean>(
			() => isTitleHovered.value || focused.value || isDragPending.value
		);
		const colWidth = computed<number>(() => (isColumnActive.value ? 400 : 200));

		const onDropCard = (card: CardMove) => {
			if (card.addedIndex === null) return;
			emit("add-column-with-card", card.payload.cardId);
		};
		const onAddColumn = () => {
			emit("add-empty-column");
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
</style>
