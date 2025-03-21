<template>
	<KebabMenuAction
		:icon="mdiAccountGroupOutline"
		data-testid="kebab-menu-action-room-members"
	>
		{{ t("pages.rooms.members.manage") }}
	</KebabMenuAction>
</template>

<script setup lang="ts">
import KebabMenuAction from "./KebabMenuAction.vue";
import { mdiAccountGroupOutline } from "@icons/material";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
</script>
