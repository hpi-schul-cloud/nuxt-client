<template>
	<KebabMenuAction
		:icon="mdiPencilPlusOutline"
		data-testid="kebab-menu-action-edit-setting"
		:disabled="disabled"
	>
		{{ t("components.board.menu.editing.settings") }}
	</KebabMenuAction>
</template>

<script setup lang="ts">
import { mdiPencilPlusOutline } from "@icons/material";
import { PropType } from "vue";
import { useI18n } from "vue-i18n";
import KebabMenuAction from "./KebabMenuAction.vue";
const { t } = useI18n();

defineProps({
	disabled: { type: Boolean as PropType<boolean>, default: false },
});
</script>
