import { i18nKeyExists, useI18nGlobal } from "@/plugins/i18n";
import { createSharedComposable } from "@vueuse/core";
import { computed, ref } from "vue";

export interface ConfirmationOptions {
	title: string;
	message?: string;
	messageType?: "warning" | "info";
	confirmBtnKey?: string;
}

// ============================================================
// Internal Composable - für App.vue Dialog
// ============================================================
export const useInternalConfirmationDialog = createSharedComposable(() => {
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

/**
 * Raises a confirmation dialog with the given options and returns a promise that resolves to true if the user confirms, or false if they cancel.
 */
export const askConfirmation = (options: ConfirmationOptions): Promise<boolean> => {
	const { askInternal } = useInternalConfirmationDialog();
	return askInternal(options);
};

/**
 * Raises a confirmation dialog for deletion actions, with a message that includes the type and name of the instance to be deleted.
 */
export const askDeletion = (options: { instanceName: string; typeKey: string }): Promise<boolean> => {
	const { t } = useI18nGlobal();

	const titleString = options.instanceName ? ` "${options.instanceName}"` : "";
	const typeString = t(options.typeKey);

	const title = t("ui-confirmation-dialog.ask-delete", {
		title: titleString,
		type: typeString,
	});

	return askConfirmation({
		title,
		confirmBtnKey: "common.actions.delete",
		messageType: "warning",
	});
};

export const askCancel = (message?: string) =>
	askConfirmation({
		title: "ui-confirmation-dialog.ask-cancel-form",
		message: message ?? "ui-confirmation-dialog.ask-cancel-warning-message",
		messageType: "warning",
		confirmBtnKey: "common.actions.discard",
	});
