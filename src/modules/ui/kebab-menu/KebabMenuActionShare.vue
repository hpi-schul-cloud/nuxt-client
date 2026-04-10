<template>
	<KebabMenuAction :icon="mdiShareVariantOutline" data-testid="kebab-menu-action-share">
		{{ actionText }}
	</KebabMenuAction>
</template>

<script setup lang="ts">
import KebabMenuAction from "./KebabMenuAction.vue";
import { mdiShareVariantOutline } from "@icons/material";
import { computed } from "vue";
import { useI18n } from "vue-i18n";
const { t } = useI18n();

const props = defineProps({
	text: { type: String, required: false, default: undefined },
});

const actionText = computed(() => props.text ?? t("common.actions.shareCopy"));
</script>
