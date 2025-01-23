<template>
	<KebabMenuAction
		:icon="mdiViewDashboardOutline"
		data-testid="board-menu-action-change-layout"
	>
		{{ $t("components.board.action.changeLayout") }}
	</KebabMenuAction>
</template>

<script setup lang="ts">
import { mdiViewDashboardOutline } from "@icons/material";
import KebabMenuAction from "./KebabMenuAction.vue";
</script>
