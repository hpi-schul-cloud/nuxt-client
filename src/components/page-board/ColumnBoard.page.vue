<template>
	<DefaultWireframe ref="main" :full-width="true" :breadcrumbs="breadcrumbs">
		<Board :board-id="boardId"></Board>
	</DefaultWireframe>
</template>
<script lang="ts">
import { Board } from "@feature-board";
import { useSharedBoardPageInformation } from "@data-board";
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
