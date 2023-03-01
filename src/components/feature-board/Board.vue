<template>
	<div class="ml-8 mr-8">
		<div>
			<h1>Board</h1>
		</div>
		<div class="d-flex flex-row flex-shrink-1">
			<template v-if="board">
				<Container
					orientation="horizontal"
					@drop="onColumnDrop"
					drag-handle-selector=".column-drag-handle"
					:drop-placeholder="upperDropPlaceholderOptions"
					:get-child-payload="getChildPayload"
				>
					<template v-for="(column, index) in board.columns">
						<Draggable :key="column.id">
							<BoardColumn
								:column="column"
								:index="index"
								@remove-from-column="updatePosition"
								@add-to-column="updatePosition"
								@position-change-keyboard="updatePositionByKeyboard"
							/>
						</Draggable>
					</template>
				</Container>
			</template>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, watch, reactive } from "vue";
import BoardColumn from "./BoardColumn.vue";
import { useBoardState } from "./BoardState.composable";
import { Container, Draggable } from "vue-smooth-dnd";
import {
	CardDndPayload,
	ColumnDndPayload,
	upperDropPlaceholderOptions,
} from "./types/DragAndDrop";

export default defineComponent({
	name: "Board",
	components: { BoardColumn, Container, Draggable },
	setup() {
		const { board, changeColumnPosition, changeCardPosition } = useBoardState(
			"0000d213816abba584714caa"
		);

		const dndCardPayload: CardDndPayload = reactive({
			cardId: "",
			cardPosition: -1,
			columnIndex: -1,
			targetColumnIndex: -1,
			targetColumnPosition: -1,
		});

		watch(dndCardPayload, () => {
			if (
				dndCardPayload.columnIndex !== -1 &&
				dndCardPayload.targetColumnIndex !== -1
			) {
				changeCardPosition(dndCardPayload);
			}
		});

		const onColumnDrop = (columnPayload: ColumnDndPayload): void => {
			console.log("column-drop", columnPayload);
			changeColumnPosition(columnPayload);
		};

		const updatePosition = (payload: CardDndPayload): void => {
			console.log("updatePosition", payload);
			Object.assign(dndCardPayload, { ...payload });
		};
		const updatePositionByKeyboard = (payload: CardDndPayload) => {
			changeCardPosition(payload);
		};

		const getChildPayload = (index: number): string => {
			return board.columns[index].id;
		};

		return {
			board,
			upperDropPlaceholderOptions,
			onColumnDrop,
			updatePosition,
			dndCardPayload,
			getChildPayload,
			updatePositionByKeyboard,
		};
	},
});
</script>
