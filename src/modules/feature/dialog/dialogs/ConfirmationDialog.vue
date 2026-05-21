<template>
	<SvsDialog
		v-model="isOpen"
		data-testid="confirm-dialog"
		:confirm-btn-lang-key="confirmBtnKey"
		:title="confirmationTitle"
		:is-open-state-managed-externally="true"
		@cancel="emit('cancel')"
		@confirm="emit('complete', true)"
		@after-leave="emit('after-leave')"
	>
		<template v-if="confirmationMessage" #content>
			<WarningAlert v-if="messageType === 'warning'" data-testid="confirm-dialog-alert">
				{{ confirmationMessage }}
			</WarningAlert>
			<InfoAlert v-if="messageType === 'info'" data-testid="confirm-dialog-alert">
				{{ confirmationMessage }}
			</InfoAlert>
		</template>
	</SvsDialog>
</template>

<script setup lang="ts">
import { i18nKeyExists, useI18nGlobal } from "@/plugins/i18n";
import { ConfirmationDialogProps, ManagedDialogEmits } from "@feature-dialog";
import { InfoAlert, WarningAlert } from "@ui-alert";
import { SvsDialog } from "@ui-dialog";
import { computed } from "vue";

const props = defineProps<ConfirmationDialogProps>();
const emit = defineEmits<ManagedDialogEmits<boolean>>();

const isOpen = defineModel<boolean>({ default: false });

const confirmationTitle = computed(() => {
	if (i18nKeyExists(props.title)) {
		return useI18nGlobal().t(props.title);
	}
	return props.title;
});

const confirmationMessage = computed(() => {
	if (props.message && i18nKeyExists(props.message)) {
		return useI18nGlobal().t(props.message);
	}
	return props.message;
});
</script>
