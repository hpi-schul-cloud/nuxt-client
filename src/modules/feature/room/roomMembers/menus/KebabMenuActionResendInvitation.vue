<template>
	<KebabMenuAction :icon="mdiPencilOutline" data-testid="kebab-menu-action-resend-invitation">
		{{ t("pages.rooms.members.registrations.actionMenu.resend") }}
	</KebabMenuAction>
</template>

<script setup lang="ts">
import { mdiPencilOutline } from "@icons/material";
import { KebabMenuAction } from "@ui-kebab-menu";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
</script>
