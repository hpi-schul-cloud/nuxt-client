<template>
	<div>
		<h1>Board</h1>
		<template v-for="column in board.columns">
			<BoardColumn :key="column.id" :column="column"></BoardColumn>
		</template>
	</div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import { Board } from "./types/Board";
import BoardColumn from "./BoardColumn.vue";

export default defineComponent({
	name: "Board",
	components: { BoardColumn },
	setup() {
		const board = reactive<Board>({
			columns: [
				{
					id: "989b0ff2-ad1e-11ed-afa1-0242ac120003",
					title: "Col1",
					cards: [
						{
							id: "989b0ff2-ad1e-11ed-afa1-0242ac120004",
							height: 200,
						},
						{
							id: "989b0ff2-ad1e-11ed-afa1-0242ac120005",
							height: 250,
						},
						{
							id: "989b0ff2-ad1e-11ed-afa1-0242ac120006",
							height: 220,
						},
					],
				},
				{
					id: "989b0ff2-ad1e-11ed-afa1-0242ac120001",
					title: "Col2",
					cards: [
						{
							id: "989b0ff2-ad1e-11ed-afa1-0242ac120204",
							height: 300,
						},
						{
							id: "989b0ff2-ad1e-11ed-afa1-0242ac120305",
							height: 350,
						},
						{
							id: "989b0ff2-ad1e-11ed-afa1-0242ac120406",
							height: 320,
						},
					],
				},
			],
			id: "989b0ff2-ad1e-11ed-afa1-0242ac120002",
			title: "MyFirstBoard!",
		});

		return { board };
	},
});
</script>
