<template>
	<SvsDialog
		v-model="isOpen"
		data-testid="confirm-dialog"
		:confirm-btn-lang-key="options?.confirmBtnKey"
		:title="confirmationTitle"
		:is-open-state-managed-externally="true"
		@cancel="emit('cancel')"
		@confirm="emit('complete', true)"
		@after-leave="emit('after-leave')"
	>
		<template v-if="confirmationMessage" #content>
			<WarningAlert v-if="options?.messageType === 'warning'" data-testid="confirm-dialog-alert">
				{{ confirmationMessage }}
			</WarningAlert>
			<InfoAlert v-if="options?.messageType === 'info'" data-testid="confirm-dialog-alert">
				{{ confirmationMessage }}
			</InfoAlert>
		</template>
	</SvsDialog>
</template>

<script setup lang="ts">
import { ConfirmationOptions } from "../dialog-contracts";
import { i18nKeyExists, useI18nGlobal } from "@/plugins/i18n";
import { SvsDialog } from "@ui-dialog";
import { computed } from "vue";

const props = defineProps<{
	options: ConfirmationOptions;
}>();

const emit = defineEmits<{
	cancel: [];
	complete: [boolean];
	"after-leave": [];
}>();

const isOpen = defineModel<boolean>({ default: false });

const confirmationTitle = computed(() => {
	if (props.options && i18nKeyExists(props.options?.title)) {
		return useI18nGlobal().t(props.options.title);
	}
	return props.options?.title ?? "";
});

const confirmationMessage = computed(() => {
	if (props.options?.message && i18nKeyExists(props.options?.message)) {
		return useI18nGlobal().t(props.options.message);
	}
	return props.options?.message;
});
</script>
