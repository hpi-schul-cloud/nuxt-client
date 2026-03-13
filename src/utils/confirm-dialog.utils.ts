import { ConfirmationOptions, useInternalConfirmationDialog } from "@/composables/confirm-dialog.composable";
import { useI18nGlobal } from "@/plugins/i18n";

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
export const askDeletionSpecific = (options: { instanceName: string; typeKey: string }): Promise<boolean> => {
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

/**
 * Raises a confirmation dialog for deletion actions, with a message that includes the type and name of the instance to be deleted.
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
