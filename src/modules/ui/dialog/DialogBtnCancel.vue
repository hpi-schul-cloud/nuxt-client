<template>
	<VBtn
		:data-testid="`${identifier}-cancel`"
		:disabled="disabled"
		variant="text"
		:text="t('common.actions.cancel')"
		@click="() => emit('click')"
	/>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";

defineProps({
	identifier: { type: String, default: "dialog" },
	disabled: { type: Boolean, default: false },
});

const emit = defineEmits<{
	(e: "click"): void;
}>();

const { t } = useI18n();
</script>
