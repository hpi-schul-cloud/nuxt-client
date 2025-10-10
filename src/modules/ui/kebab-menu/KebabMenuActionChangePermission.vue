<template>
	<KebabMenuAction :icon="mdiAccountEditOutline" data-testid="kebab-menu-action-change-permission">
		{{ t("pages.rooms.members.changePermission") }}
	</KebabMenuAction>
</template>

<script setup lang="ts">
import KebabMenuAction from "./KebabMenuAction.vue";
import { mdiAccountEditOutline } from "@icons/material";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>
