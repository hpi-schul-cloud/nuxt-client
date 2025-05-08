<template>
	<KebabMenuAction
		:icon="mdiTrayArrowDown"
		data-testid="kebab-menu-action-download"
		:disabled="disabled"
	>
		{{ t("components.board.action.download") }}
	</KebabMenuAction>
</template>

<script setup lang="ts">
import { mdiTrayArrowDown } from "@icons/material";
import { PropType } from "vue";
import { useI18n } from "vue-i18n";
import KebabMenuAction from "./KebabMenuAction.vue";
defineProps({
	disabled: { type: Boolean as PropType<boolean>, default: false },
});
const { t } = useI18n();
</script>
