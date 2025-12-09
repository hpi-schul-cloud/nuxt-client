<template>
	<KebabMenuAction :icon="mdiPencilOutline" :data-testid="attrs.dataTestId ?? 'kebab-menu-action-edit'">
		{{ text ?? t("common.actions.edit") }}
	</KebabMenuAction>
</template>

<script setup lang="ts">
import KebabMenuAction from "./KebabMenuAction.vue";
import { mdiPencilOutline } from "@icons/material";
import { useAttrs } from "vue";
import { useI18n } from "vue-i18n";

defineProps({
	text: { type: String, required: false, default: undefined },
});

const attrs = useAttrs();
const { t } = useI18n();
</script>
