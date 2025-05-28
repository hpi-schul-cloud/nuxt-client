<template>
	<KebabMenuAction
		:icon="mdiAccountRemoveOutline"
		data-testid="kebab-menu-action-confirm-request"
	>
		{{ t("pages.rooms.members.confirmationTable.menus.reject.label") }}
	</KebabMenuAction>
</template>

<script setup lang="ts">
import { KebabMenuAction } from "@ui-kebab-menu";
import { mdiAccountRemoveOutline } from "@icons/material";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
</script>
