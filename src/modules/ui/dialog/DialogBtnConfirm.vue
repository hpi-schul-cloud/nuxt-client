<template>
	<VBtn
		:data-testid="testId"
		class="px-6"
		color="primary"
		variant="flat"
		:text="t(textLangKey)"
		:disabled
		@click="emit('click')"
	/>
</template>

<script setup lang="ts">
import { useAttrs } from "vue";
import { useI18n } from "vue-i18n";

defineProps({
	textLangKey: { type: String, default: "common.actions.confirm" },
	disabled: { type: Boolean, default: false },
});

const emit = defineEmits<{
	(e: "click"): void;
}>();

const { t } = useI18n();

const attrs = useAttrs();
const testId = attrs["data-testid"] ?? "dialog-confirm";
</script>
