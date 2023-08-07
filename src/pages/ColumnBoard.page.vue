<template>
	<div><Test></Test>{{ boardId }}</div>
	<!-- <DefaultWireframe ref="main" :full-width="true" :breadcrumbs="breadcrumbs">
		<Board :board-id="boardId"></Board>
	</DefaultWireframe> -->
</template>
<script lang="ts">
import Theme from "../theme.config";
import { I18N_KEY, injectStrict } from "@/utils/inject";
import { useTitle } from "@vueuse/core";
import { defineComponent } from "vue";
import { useRoute } from "vue-router/composables";
import { Test } from "@ui-confirmation-dialog";

export default defineComponent({
	name: "ColumnBoardPage",
	// components: { Board, DefaultWireframe },
	components: { Test },
	setup() {
		const i18n = injectStrict(I18N_KEY);
		const route = useRoute();
		const boardId = route.params?.id;
		// const { breadcrumbs } = useSharedBoardBreadcrumbs();

		console.log("init board page");

		useTitle(`${i18n.t("components.board")} -  ${Theme.name}`);
		return {
			// breadcrumbs,
			boardId,
		};
	},
});
</script>
