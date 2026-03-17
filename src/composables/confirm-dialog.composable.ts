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
export const useInternalConfirmDialog = createSharedComposable(() => {
	let resolvePromise: ((value: boolean) => void) | undefined = undefined;

	const dialogOptions = ref<ConfirmationOptions | undefined>();
	const isDialogOpen = ref(false);

	const closeDialog = (result: boolean) => {
		if (resolvePromise) {
			resolvePromise(result);
		}
		isDialogOpen.value = false;
		resolvePromise = undefined;
	};

	const resetDialogOptions = () => {
		dialogOptions.value = undefined;
	};

	const confirm = () => closeDialog(true);
	const cancel = () => closeDialog(false);

	const askInternal = (options: ConfirmationOptions): Promise<boolean> => {
		dialogOptions.value = options;
		isDialogOpen.value = true;

		return new Promise<boolean>((resolve) => {
			resolvePromise = resolve;
		});
	};

	const confirmTitle = computed(() => {
		if (dialogOptions.value && i18nKeyExists(dialogOptions.value?.title)) {
			return useI18nGlobal().t(dialogOptions.value.title);
		}
		return dialogOptions.value?.title ?? "";
	});

	const confirmMessage = computed(() => {
		if (dialogOptions.value?.message && i18nKeyExists(dialogOptions.value?.message)) {
			return useI18nGlobal().t(dialogOptions.value.message);
		}
		return dialogOptions.value?.message;
	});

	return {
		askInternal,
		confirmTitle,
		confirmMessage,
		dialogOptions,
		isDialogOpen,
		confirm,
		cancel,
		resetDialogOptions,
	};
});
