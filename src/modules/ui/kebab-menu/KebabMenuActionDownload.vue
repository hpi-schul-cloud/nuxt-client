<template>
	<KebabMenuAction
		:icon="mdiTrayArrowDown"
		data-testid="kebab-menu-action-download"
	>
		{{ t("components.board.action.download") }}
	</KebabMenuAction>
</template>

<script setup lang="ts">
import { mdiTrayArrowDown } from "@icons/material";
import { useI18n } from "vue-i18n";
import KebabMenuAction from "./KebabMenuAction.vue";
const { t } = useI18n();
</script>
