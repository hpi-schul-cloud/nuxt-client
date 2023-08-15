<template>
	<DefaultWireframe ref="main" :full-width="true" :breadcrumbs="breadcrumbs">
		<Board :board-id="boardId"></Board>
	</DefaultWireframe>
</template>
<script lang="ts">
import Board from "@/components/feature-board/board/Board.vue";
import { useSharedBoardPageInformation } from "@/components/feature-board/shared/BoardPageInformation.composable";
import DefaultWireframe from "@/components/templates/DefaultWireframe.vue";
import { useTitle } from "@vueuse/core";
import { defineComponent } from "vue";
import { useRoute } from "vue-router/composables";

export default defineComponent({
	name: "ColumnBoardPage",
	components: { Board, DefaultWireframe },
	setup() {
		const route = useRoute();
		const boardId = route.params?.id;
		const { breadcrumbs, pageTitle } = useSharedBoardPageInformation();

		useTitle(pageTitle);

		return {
			breadcrumbs,
			boardId,
		};
	},
});
</script>
