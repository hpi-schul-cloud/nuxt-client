<template>
	<Board :board-id="boardId" :breadcrumbs="breadcrumbs" />
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

const { breadcrumbs, pageTitle } = useSharedBoardPageInformation();

useTitle(pageTitle);
</script>
