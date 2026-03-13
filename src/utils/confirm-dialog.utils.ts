import { ConfirmationOptions, useInternalConfirmationDialog } from "@/composables/confirm-dialog.composable";
import { i18nKeyExists, useI18nGlobal } from "@/plugins/i18n";

/**
 * Raises a confirmation dialog with the given options and returns a promise that resolves to true if the user confirms, or false if they cancel.
 */
export const askConfirmation = (options: ConfirmationOptions): Promise<boolean> => {
	const { askInternal } = useInternalConfirmationDialog();
	return askInternal(options);
};

/**
 * Raises a confirmation dialog for deletion actions.
 * Message is interpolated with itemName only.
 */
export const askDeletionItem = (options: {
	title: string;
	itemName: string;
	message: string;
	confirmBtnKey?: string;
	messageType?: "info" | "warning";
}) => {
	const { t } = useI18nGlobal();

	return askConfirmation({
		title: options.title,
		message: i18nKeyExists(options.message) ? t(options.message, { itemName: options.itemName }) : options.message,
		confirmBtnKey: options.confirmBtnKey ?? "common.actions.delete",
		messageType: options.messageType ?? "warning",
	});
};

/**
 * Raises a confirmation dialog for deletion actions.
 */
export const askDeletion = (title: string, message: string, messageType: "info" | "warning") =>
	askConfirmation({
		title,
		message,
		messageType: messageType ?? "warning",
		confirmBtnKey: "common.actions.delete",
	});

export const askCancel = (title?: string, message?: string) =>
	askConfirmation({
		title: title ?? "ui-confirmation-dialog.ask-cancel-form",
		message: message ?? "ui-confirmation-dialog.ask-cancel-warning-message",
		messageType: "warning",
		confirmBtnKey: "common.actions.discard",
	});
