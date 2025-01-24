<template>
	<KebabMenuAction
		:icon="mdiTrashCanOutline"
		:data-testid="testId"
		:aria-label="removeMemberAriaLabel"
	>
		{{ t("common.actions.remove") }}
	</KebabMenuAction>
</template>

<script setup lang="ts">
import KebabMenuAction from "./KebabMenuAction.vue";
import { mdiTrashCanOutline } from "@icons/material";
import { useI18n } from "vue-i18n";

defineProps({
	testId: {
		type: String,
		required: true,
	},
	removeMemberAriaLabel: {
		type: String,
		required: true,
	},
});
const { t } = useI18n();
</script>
