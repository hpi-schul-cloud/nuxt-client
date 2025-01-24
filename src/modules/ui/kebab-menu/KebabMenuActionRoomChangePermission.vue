<template>
	<KebabMenuAction
		:icon="mdiAccountSwitchOutline"
		:data-testid="testId"
		:aria-label="t('pages.rooms.members.changePermission')"
	>
		{{ t("pages.rooms.members.changePermission") }}
	</KebabMenuAction>
</template>

<script setup lang="ts">
import KebabMenuAction from "./KebabMenuAction.vue";
import { mdiAccountSwitchOutline } from "@icons/material";
import { useI18n } from "vue-i18n";

defineProps({
	testId: {
		type: String,
		required: true,
	},
});
const { t } = useI18n();
</script>
