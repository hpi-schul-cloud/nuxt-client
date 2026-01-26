<template>
	<VBtn data-testid="dialog-cancel" :disabled variant="text" :text="t(textLangKey)" @click="emit('click')" />
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";

defineProps({
	textLangKey: { type: String, default: "common.actions.cancel" },
	disabled: { type: Boolean, default: false },
});

const emit = defineEmits<{
	(e: "click"): void;
}>();

const { t } = useI18n();
</script>
