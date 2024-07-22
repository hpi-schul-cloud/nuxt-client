<template>
	<BoardMenuAction
		:icon="mdiPencilOutline"
		data-testid="board-menu-action-edit"
		@click="onClick"
	>
		{{ $t("common.actions.edit") }}
	</BoardMenuAction>
</template>

<script setup lang="ts">
import { mdiPencilOutline } from "@mdi/js";
import { BoardMenuAction } from "@ui-board";

defineProps({
	name: { type: String, required: false },
	skipDeleteConfirmation: { type: Boolean, default: () => false },
});

const emit = defineEmits(["click"]);

const onClick = ($event: Event) => emit("click", $event);
</script>
