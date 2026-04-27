<template>
	<Board :board-id="boardId" :detail-view-card-id="detailViewCardId" />
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
	detailViewCardId: {
		type: String,
		required: false,
		default: undefined,
	},
});

const { pageTitle } = useSharedBoardPageInformation();

useTitle(pageTitle);
</script>
