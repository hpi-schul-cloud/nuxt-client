<template>
	<BoardMenuAction
		:icon="mdiShareVariantOutline"
		@click="onClick"
		data-testid="board-menu-action-share"
	>
		{{ $t("common.actions.shareBoard") }}
	</BoardMenuAction>
</template>

<script setup lang="ts">
import { BoardMenuAction } from "@ui-board";
import { mdiShareVariantOutline } from "@/components/icons/material";

const emit = defineEmits(["click"]);

const onClick = ($event: Event) => emit("click", $event);
</script>
