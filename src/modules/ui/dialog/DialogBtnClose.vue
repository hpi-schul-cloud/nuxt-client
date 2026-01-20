<template>
	<VBtn
		:data-testid="`${identifier}-close`"
		variant="outlined"
		:text="t('common.labels.close')"
		@click="emit('click')"
	/>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
const { t } = useI18n();

defineProps({
	identifier: { type: String, default: "dialog" },
});

const emit = defineEmits<{
	(e: "click"): void;
}>();
</script>
