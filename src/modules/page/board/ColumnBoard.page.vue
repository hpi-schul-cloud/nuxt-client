<template>
	<Board :board-id="boardId" />
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
});

const { pageTitle } = useSharedBoardPageInformation();

useTitle(pageTitle);
</script>
