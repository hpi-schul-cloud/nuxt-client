<template>
	<div>
		<h2>MyColumn</h2>
		<template v-for="card in column.cards">
			<CardHost :key="card.id" :id="card.id" :height="card.height"></CardHost>
		</template>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { BoardColumn } from "./types/Board";
import CardHost from "./CardHost.vue";
export default defineComponent({
	name: "BoardColumn",
	components: { CardHost },
	props: {
		column: {
			type: Object as PropType<BoardColumn>,
			required: true,
		},
	},
	setup(props) {
		return {};
	},
});
</script>
