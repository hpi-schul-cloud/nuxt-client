<template>
	<div ref="ghostColumnRef">
		<BoardColumnGhostHeader
			ref="ghostColumnTitleRef"
			:isColumnActive="isColumnActive"
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
				:drop-placeholder="drowpdownDropPlaceholderOptions"
			>
				<!-- <template v-for="(card, index) in column.cards">
            <Draggable :key="card.cardId">
              <CardHost
                class="mb-6"
                :card-id="card.cardId"
                :height="card.height"
                @move-card-keyboard="onMoveCardKeyboard(index, card, $event)"
              />
            </Draggable>
          </template> -->
			</Container>
		</div>
	</div>
</template>
<script lang="ts">
import { useElementHover, useFocusWithin } from "@vueuse/core";
import { computed, defineComponent, ref } from "vue";
import { Container } from "vue-smooth-dnd";
import { drowpdownDropPlaceholderOptions } from "../types/DragAndDrop";
import BoardColumnGhostHeader from "./BoardColumnGhostHeader.vue";

export default defineComponent({
	name: "BoardColumnGhost",
	components: { Container, BoardColumnGhostHeader },
	setup() {
		const isDragPending = ref<boolean>(false);

		const ghostColumnRef = ref<HTMLDivElement | undefined>();
		const ghostColumnTitleRef = ref<HTMLElement | undefined>();

		const isTitleHovered = useElementHover(ghostColumnTitleRef);
		const { focused } = useFocusWithin(ghostColumnRef);

		const isColumnActive = computed<boolean>(
			() => isTitleHovered.value || focused.value || isDragPending.value
		);
		const colWidth = computed<number>(() => (isColumnActive.value ? 400 : 200));

		const onDropCard = () => {
			// sth
		};

		const onDragEnter = () => {
			isDragPending.value = true;
			console.log("dargEnter");
			// hover over column
		};
		const onDragLeave = () => {
			isDragPending.value = false;
			console.log("dragLEave");
			// blur over column
		};

		return {
			onDropCard,
			onDragEnter,
			onDragLeave,
			colWidth,
			drowpdownDropPlaceholderOptions,
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
