<template>
	<DefaultWireframe ref="main" :full-width="true" :breadcrumbs="breadcrumbs">
		<Board :board-id="boardId"></Board>
	</DefaultWireframe>
</template>
<script lang="ts">
import { defineComponent, inject } from "vue";
import { useRoute } from "vue-router/composables";
import { useBoardBreadcrums } from "@/components/feature-board/shared/BoardBreadcrums.composable";
import DefaultWireframe from "@/components/templates/DefaultWireframe.vue";
import Board from "@/components/feature-board/board/Board.vue";
import Theme from "@/theme.config";
import { useTitle } from "@vueuse/core";
import VueI18n from "vue-i18n";

export default defineComponent({
	name: "ColumnBoardPage",
	components: { Board, DefaultWireframe },
	setup() {
		const i18n = inject<VueI18n | undefined>("i18n");
		const route = useRoute();
		const boardId = route.params?.id;
		const breadcrumbs = useBoardBreadcrums(boardId);

		useTitle(`${i18n?.t("components.board")} -  ${Theme.name}`);

		return {
			breadcrumbs,
			boardId,
		};
	},
});
</script>
