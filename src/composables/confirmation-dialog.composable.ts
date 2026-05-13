import { useAwaitableAction } from "@/composables/awaitable-action.composable";
import { i18nKeyExists, useI18nGlobal } from "@/plugins/i18n";
import { createSharedComposable } from "@vueuse/core";
import { computed, ref } from "vue";

export interface ConfirmationOptions {
	title: string;
	message?: string;
	messageType?: "warning" | "info";
	confirmBtnKey?: string;
}

/**
 * Internal composable for managing the global confirmation dialog state.
 * DO NOT use this directly - use the helper functions from `@/utils/confirm-dialog.utils` instead:
 * - `askConfirmation()` - for generic confirmation dialogs
 * - `askDeletion()` - for delete confirmation dialogs
 * - `askCancel()` - for cancel/discard confirmation dialogs
 *
 * This composable is only meant to be used in App.vue where the dialog is rendered.
 */
export const useInternalConfirmationDialog = createSharedComposable(() => {
	const confirmationAction = useAwaitableAction<boolean>();

	const dialogOptions = ref<ConfirmationOptions | undefined>();

	const resetDialogOptions = () => {
		dialogOptions.value = undefined;
	};

	const confirm = () => confirmationAction.complete(true);
	const cancel = () => confirmationAction.cancel();

	const askInternal = async (options: ConfirmationOptions): Promise<boolean> => {
		dialogOptions.value = options;
		const { completed } = await confirmationAction.start();
		return completed;
	};

	const confirmationTitle = computed(() => {
		if (dialogOptions.value && i18nKeyExists(dialogOptions.value?.title)) {
			return useI18nGlobal().t(dialogOptions.value.title);
		}
		return dialogOptions.value?.title ?? "";
	});

	const confirmationMessage = computed(() => {
		if (dialogOptions.value?.message && i18nKeyExists(dialogOptions.value?.message)) {
			return useI18nGlobal().t(dialogOptions.value.message);
		}
		return dialogOptions.value?.message;
	});

	return {
		askInternal,
		confirmationTitle,
		confirmationMessage,
		dialogOptions,
		isDialogOpen: confirmationAction.isActive,
		confirm,
		cancel,
		resetDialogOptions,
	};
});
