<template>
	<VBtn :data-testid="testId" variant="outlined" :text="t('common.labels.close')" @click="emit('click')" />
</template>

<script setup lang="ts">
import { useAttrs } from "vue";
import { useI18n } from "vue-i18n";

const emit = defineEmits<{
	(e: "click"): void;
}>();

const { t } = useI18n();

const attrs = useAttrs();
const testId = attrs["data-testid"] ?? "dialog-close";
</script>
