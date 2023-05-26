<template>
	<DefaultWireframe ref="main" :full-width="true" :breadcrumbs="breadcrumbs">
		<Board :board-id="boardId"></Board>
	</DefaultWireframe>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { useRoute } from "vue-router/composables";
import { useBoardBreadcrums } from "@/components/feature-board/shared/BoardBreadcrums.composable";
import DefaultWireframe from "@/components/templates/DefaultWireframe.vue";
import Board from "@/components/feature-board/board/Board.vue";

export default defineComponent({
	name: "ColumnBoardPage",
	components: { Board, DefaultWireframe },
	setup() {
		const route = useRoute();
		const boardId = route.params?.id;
		const breadcrumbs = useBoardBreadcrums(boardId);

		return {
			breadcrumbs,
			boardId,
		};
	},
});
</script>
