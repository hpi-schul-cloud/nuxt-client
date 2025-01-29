<template>
	<KebabMenuAction
		:icon="mdiLocationExit"
		data-testid="kebab-menu-action-leave-room"
		:aria-label="t('pages.rooms.leaveRoom.menu')"
	>
		{{ t("pages.rooms.leaveRoom.menu") }}
	</KebabMenuAction>
</template>

<script setup lang="ts">
import KebabMenuAction from "./KebabMenuAction.vue";
import { mdiLocationExit } from "@icons/material";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
</script>
