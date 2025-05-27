<template>
	<KebabMenuAction
		:icon="mdiAccountCheckOutline"
		data-testid="kebab-menu-action-confirm-request"
	>
		Beitrittsanfrage bestätigen
	</KebabMenuAction>
</template>

<script setup lang="ts">
import { KebabMenuAction } from "@ui-kebab-menu";
import { mdiAccountCheckOutline } from "@icons/material";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
</script>
