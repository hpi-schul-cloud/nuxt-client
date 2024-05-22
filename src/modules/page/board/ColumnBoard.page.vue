<template>
	<Board :board-id="boardId" :breadcrumbs="breadcrumbs" />
</template>

<script lang="ts">
import { useSharedBoardPageInformation } from "@data-board";
import { Board } from "@feature-board";
import { useTitle } from "@vueuse/core";
import { defineComponent } from "vue";

export default defineComponent({
	name: "ColumnBoardPage",
	components: { Board },
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
