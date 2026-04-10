<template>
	<KebabMenuAction :icon="mdiTrashCanOutline" data-testid="kebab-menu-action-remove-invitation">
		{{ t("pages.rooms.members.registrations.actionMenu.remove") }}
	</KebabMenuAction>
</template>

<script setup lang="ts">
import { mdiTrashCanOutline } from "@icons/material";
import { KebabMenuAction } from "@ui-kebab-menu";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
</script>
