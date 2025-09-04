<template>
	<KebabMenuAction
		:disabled="disabled"
		:icon="mdiAccountEditOutline"
		data-testid="kebab-menu-action-change-permission"
		:aria-label="t('pages.rooms.members.changePermission')"
	>
		{{ t("pages.rooms.members.changePermission") }}
	</KebabMenuAction>
</template>

<script setup lang="ts">
import KebabMenuAction from "./KebabMenuAction.vue";
import { mdiAccountEditOutline } from "@icons/material";
import { PropType } from "vue";
import { useI18n } from "vue-i18n";
const { t } = useI18n();

defineProps({
	disabled: { type: Boolean as PropType<boolean>, default: false },
	click: {
		type: Function as PropType<() => void>,
		default: undefined,
		required: false,
	},
});
</script>
