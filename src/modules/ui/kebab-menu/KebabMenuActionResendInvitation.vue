<template>
	<KebabMenuAction :icon="mdiPencilOutline" data-testid="kebab-menu-action-resend-invitation">
		{{ t("pages.rooms.members.registrations.actionMenu.resend") }}
	</KebabMenuAction>
</template>

<script setup lang="ts">
import KebabMenuAction from "./KebabMenuAction.vue";
import { mdiPencilOutline } from "@icons/material";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
</script>
