<template>
	<div class="column-drag-handle px-4 multi-column-board-column bg-white user-select-none d-flex flex-column">
		<BoardColumnHeader
			:can-edit-column="false"
			:can-delete-column="false"
			:column-id="column.id"
			:title="column.title"
			:index="index"
			:is-list-board="isListBoard"
			:is-not-first-column="true"
			:is-not-last-column="isNotLastColumn"
		/>
		<div class="d-flex justify-center align-center" style="min-height: 200px">
			<VProgressCircular color="primary" indeterminate :size="36" />
		</div>
	</div>
</template>

<script setup lang="ts">
import BoardColumnHeader from "./BoardColumnHeader.vue";
import { BoardColumn } from "@/types/board/Board";
import { computed } from "vue";

type Props = {
	column: BoardColumn;
	isListBoard: boolean;
	isNotLastColumn: boolean;
	index: number;
};
const props = defineProps<Props>();

const columnClasses = computed(() => {
	if (props.isListBoard) {
		return ["my-0", "align-stretch"];
	}
	return ["px-4", "multi-column-board-column"];
});
</script>

<style>
.multi-column-board-column {
	width: 400px;
}
</style>
