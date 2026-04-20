<template>
	<Board :board-id="boardId" :target-card-id="targetCardId" />
</template>

<script setup lang="ts">
import { useSharedBoardPageInformation } from "@data-board";
import { Board } from "@feature-board";
import { useTitle } from "@vueuse/core";

defineProps({
	boardId: {
		type: String,
		required: true,
	},
	targetCardId: {
		type: String,
		required: false,
		default: undefined,
	},
});

const { pageTitle } = useSharedBoardPageInformation();

useTitle(pageTitle);
</script>
