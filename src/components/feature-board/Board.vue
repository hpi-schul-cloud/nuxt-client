<template>
	<div>
		<h1>Board</h1>
		<div class="d-flex flex-row flex-shrink-1">
			<template v-if="board">
				<template v-for="column in board.columns">
					<BoardColumn :key="column.id" :column="column"></BoardColumn>
				</template>
			</template>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useBoardState } from "./board-state.composable";
import BoardColumn from "./BoardColumn.vue";

export default defineComponent({
	name: "Board",
	components: { BoardColumn },
	setup() {
		const { board } = useBoardState("989b0ff2-ad1e-11ed-afa1-0242ac120002");

		return { board };
	},
});
</script>
