<template>
	<Suspense>
		<Board :board-id="boardId" :breadcrumbs="breadcrumbs" />
	</Suspense>
</template>

<script setup lang="ts">
import { useSharedBoardPageInformation } from "@data-board";
import { useTitle } from "@vueuse/core";
import { defineAsyncComponent } from "vue";

defineProps({
	boardId: {
		type: String,
		required: true,
	},
});
const Board = defineAsyncComponent(
	() => import("../../feature/board/board/Board.vue")
);

const { breadcrumbs, pageTitle } = useSharedBoardPageInformation();

useTitle(pageTitle);
</script>
