<template>
	<KebabMenuAction :icon="mdiRenameOutline" data-testid="kebab-menu-action-rename" :disabled="disabled">
		{{ t("common.actions.rename") }}
	</KebabMenuAction>
</template>

<script setup lang="ts">
import KebabMenuAction from "./KebabMenuAction.vue";
import { mdiRenameOutline } from "@icons/material";
import { PropType } from "vue";
import { useI18n } from "vue-i18n";
const { t } = useI18n();

defineProps({
	disabled: { type: Boolean as PropType<boolean>, default: false },
});
</script>
