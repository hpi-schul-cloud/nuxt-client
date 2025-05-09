<template>
	<KebabMenuAction
		:icon="mdiAccountGroupOutline"
		data-testid="kebab-menu-action-room-members"
	>
		{{ membersInfoText }}
	</KebabMenuAction>
</template>

<script setup lang="ts">
import KebabMenuAction from "./KebabMenuAction.vue";
import { mdiAccountGroupOutline } from "@icons/material";

defineProps({
	membersInfoText: { type: String, required: true },
});
</script>
