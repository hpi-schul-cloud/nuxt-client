<template>
	<v-btn @click="onUpdateBoardName" data-testid="btn-update-board-name">{{
		boardName
	}}</v-btn>
</template>
<script lsng="ts">
import { useBoardStore } from "@/store/board.store";
import { computed, defineComponent } from "vue";

export default defineComponent({
	setup() {
		const boardStore = useBoardStore();

		return {
			boardName: computed(() => boardStore.getName),
			onUpdateBoardName: () => {
				boardStore.updateBoardName();
			},
		};
	},
});
</script>
