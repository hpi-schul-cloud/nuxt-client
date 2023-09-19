<template>
	<DefaultWireframe ref="main" :full-width="true" :breadcrumbs="breadcrumbs">
		<Board :board-id="boardId"></Board>
	</DefaultWireframe>
</template>

<script lang="ts">
import DefaultWireframe from "@/components/templates/DefaultWireframe.vue";
import ContextExternalToolsModule from "@/store/context-external-tools";
import EnvConfigModule from "@/store/env-config";
import { ToolContextType } from "@/store/external-tool";
import {
	CONTEXT_EXTERNAL_TOOLS_MODULE_KEY,
	ENV_CONFIG_MODULE_KEY,
	injectStrict,
} from "@/utils/inject";
import { useSharedBoardPageInformation } from "@data-board";
import { Board } from "@feature-board";
import { useTitle } from "@vueuse/core";
import { defineComponent, onMounted } from "vue";

export default defineComponent({
	name: "ColumnBoardPage",
	components: { Board, DefaultWireframe },
	props: {
		boardId: {
			type: String,
			required: true,
		},
	},
	setup(props) {
		const { breadcrumbs, pageTitle } = useSharedBoardPageInformation();
		const contextExternalToolsModule: ContextExternalToolsModule = injectStrict(
			CONTEXT_EXTERNAL_TOOLS_MODULE_KEY
		);
		const envConfigModule: EnvConfigModule = injectStrict(
			ENV_CONFIG_MODULE_KEY
		);

		useTitle(pageTitle);

		onMounted(async () => {
			if (envConfigModule.getEnv.FEATURE_COLUMN_BOARD_EXTERNAL_TOOLS_ENABLED) {
				await contextExternalToolsModule.loadExternalToolDisplayData({
					contextId: props.boardId,
					contextType: ToolContextType.BOARD,
				});
			}
		});

		return {
			breadcrumbs,
		};
	},
});
</script>
