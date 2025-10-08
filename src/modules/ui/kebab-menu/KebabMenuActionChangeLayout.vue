<template>
	<KebabMenuAction :icon="mdiViewDashboardOutline" data-testid="board-menu-action-change-layout">
		{{ $t("components.board.action.changeLayout") }}
	</KebabMenuAction>
</template>

<script setup lang="ts">
import KebabMenuAction from "./KebabMenuAction.vue";
import { mdiViewDashboardOutline } from "@icons/material";
</script>
