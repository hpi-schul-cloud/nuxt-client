<template>
	<DefaultWireframe ref="main" :full-width="true" :breadcrumbs="breadcrumbs">
		<Board :board-id="boardId"></Board>
	</DefaultWireframe>
</template>
<script lang="ts">
import Board from "@/components/feature-board/board/Board.vue";
import { useBoardBreadcrumbs } from "@/components/feature-board/shared/BoardBreadcrumbs.composable";
import DefaultWireframe from "@/components/templates/DefaultWireframe.vue";
import Theme from "@/theme.config";
import { I18N_KEY, injectStrict } from "@/utils/inject";
import { useTitle } from "@vueuse/core";
import { defineComponent } from "vue";
import { useRoute } from "vue-router/composables";

export default defineComponent({
	name: "ColumnBoardPage",
	components: { Board, DefaultWireframe },
	setup() {
		const i18n = injectStrict(I18N_KEY);
		const route = useRoute();
		const boardId = route.params?.id;
		const breadcrumbs = useBoardBreadcrumbs();

		useTitle(`${i18n.t("components.board")} -  ${Theme.name}`);

		return {
			breadcrumbs,
			boardId,
		};
	},
});
</script>
