<template>
	<KebabMenuAction
		:icon="mdiPencilPlusOutline"
		data-testid="kebab-menu-action-edit-setting"
	>
		{{ t("components.board.menu.editing.settings.title") }}
	</KebabMenuAction>
</template>

<script setup lang="ts">
import { mdiPencilPlusOutline } from "@icons/material";
import { useI18n } from "vue-i18n";
import KebabMenuAction from "./KebabMenuAction.vue";
const { t } = useI18n();
</script>
