<template>
	<DefaultWireframe ref="main" :full-width="true" :breadcrumbs="breadcrumbs">
		<Board :board-id="boardId"></Board>
	</DefaultWireframe>
</template>
<script lang="ts">
import DefaultWireframe from "@/components/templates/DefaultWireframe.vue";
import ContextExternalToolsModule from "@/store/context-external-tools";
import { ToolContextType } from "@/store/external-tool";
import {
	CONTEXT_EXTERNAL_TOOLS_MODULE_KEY,
	injectStrict,
} from "@/utils/inject";
import { useSharedBoardPageInformation } from "@data-board";
import { Board } from "@feature-board";
import { useTitle } from "@vueuse/core";
import { defineComponent, onMounted } from "vue";
import { useRoute } from "vue-router/composables";

export default defineComponent({
	name: "ColumnBoardPage",
	components: { Board, DefaultWireframe },
	setup() {
		const route = useRoute();
		const boardId: string = route.params?.id;
		const { breadcrumbs, pageTitle } = useSharedBoardPageInformation();
		const contextExternalToolsModule: ContextExternalToolsModule = injectStrict(
			CONTEXT_EXTERNAL_TOOLS_MODULE_KEY
		);

		useTitle(pageTitle);

		onMounted(async () => {
			await contextExternalToolsModule.loadExternalToolDisplayData({
				contextId: boardId,
				contextType: ToolContextType.BOARD,
			});
		});

		return {
			breadcrumbs,
			boardId,
		};
	},
});
</script>
