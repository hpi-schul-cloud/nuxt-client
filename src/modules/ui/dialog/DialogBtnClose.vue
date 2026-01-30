<template>
	<VBtn data-testid="dialog-close" variant="outlined" :text="t('common.labels.close')" @click="emit('click')" />
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";

const emit = defineEmits<{
	(e: "click"): void;
}>();

const { t } = useI18n();
</script>
