<template>
	<BoardMenuAction
		:icon="mdiEyeOutline"
		data-testid="board-menu-action-publish"
		@click="onClick"
	>
		{{ t("common.action.publish") }}
	</BoardMenuAction>
</template>

<script setup lang="ts">
import { mdiEyeOutline } from "@icons/material";
import { BoardMenuAction } from "@ui-board";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const emit = defineEmits(["click"]);

const onClick = ($event: Event) => emit("click", $event);
</script>
