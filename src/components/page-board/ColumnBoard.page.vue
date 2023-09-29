<template>
	<DefaultWireframe ref="main" :full-width="true" :breadcrumbs="breadcrumbs">
		<Board :board-id="boardId"></Board>
	</DefaultWireframe>
</template>

<script lang="ts">
import DefaultWireframe from "@/components/templates/DefaultWireframe.vue";
import { useSharedBoardPageInformation } from "@data-board";
import { Board } from "@feature-board";
import { useTitle } from "@vueuse/core";
import { defineComponent } from "vue";

export default defineComponent({
	name: "ColumnBoardPage",
	components: { Board, DefaultWireframe },
	props: {
		boardId: {
			type: String,
			required: true,
		},
	},
	setup() {
		const { breadcrumbs, pageTitle } = useSharedBoardPageInformation();

		useTitle(pageTitle);

		return {
			breadcrumbs,
		};
	},
});
</script>
