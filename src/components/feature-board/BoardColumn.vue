<template>
	<div>
		<h2>{{ column.title }}</h2>
		<div
			class="d-flex flex-column flex-grow-1 mr-4"
			:style="{ 'min-width': colWidth + 'px' }"
		>
			<template v-for="card in column.cards">
				<CardHost :key="card.id" :id="card.id" :height="card.height"></CardHost>
			</template>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from "vue";
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
	setup() {
		const colWidth = ref<number>(400);

		return { colWidth };
	},
});
</script>
