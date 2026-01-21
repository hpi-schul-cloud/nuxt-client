<template>
	<VBtn
		:data-testid="testId"
		:disabled="disabled"
		variant="text"
		:text="t('common.actions.cancel')"
		@click="() => emit('click')"
	/>
</template>

<script setup lang="ts">
import { useAttrs } from "vue";
import { useI18n } from "vue-i18n";

defineProps({
	identifier: { type: String, default: "dialog" },
	disabled: { type: Boolean, default: false },
});

const emit = defineEmits<{
	(e: "click"): void;
}>();

const { t } = useI18n();

const attrs = useAttrs();
const testId = attrs["data-testid"] ?? "dialog-cancel";
</script>
