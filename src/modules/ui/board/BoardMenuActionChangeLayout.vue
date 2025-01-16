<template>
	<BoardMenuAction
		:icon="mdiViewDashboardOutline"
		data-testid="board-menu-action-change-layout"
	>
		{{ $t("components.board.action.changeLayout") }}
	</BoardMenuAction>
</template>

<script setup lang="ts">
import { mdiViewDashboardOutline } from "@icons/material";
import { BoardMenuAction } from "@ui-board";
</script>
