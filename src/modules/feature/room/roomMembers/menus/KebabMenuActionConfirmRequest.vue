<template>
	<KebabMenuAction
		:icon="mdiAccountCheckOutline"
		data-testid="kebab-menu-action-confirm-request"
	>
		{{ t("pages.rooms.members.confirmationTable.menus.confirm.label") }}
	</KebabMenuAction>
</template>

<script setup lang="ts">
import { KebabMenuAction } from "@ui-kebab-menu";
import { mdiAccountCheckOutline } from "@icons/material";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
</script>
