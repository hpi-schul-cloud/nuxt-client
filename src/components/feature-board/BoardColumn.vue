<template>
	<div :style="{ 'min-width': colWidth + 'px', 'max-width': colWidth + 'px' }">
		<h4 class="text-truncate pr-4">{{ column.title }}</h4>
		<div class="d-flex flex-column flex-grow-1 mr-4">
			<template v-for="card in column.cards">
				<CardHost
					:key="card.cardId"
					:id="card.cardId"
					:height="card.height"
				></CardHost>
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
