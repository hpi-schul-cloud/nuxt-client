import { ConfirmationOptions, useInternalConfirmDialog } from "@/composables/confirm-dialog.composable";
import { i18nKeyExists, useI18nGlobal } from "@/plugins/i18n";

/**
 * Raises a confirmation dialog with the given options and returns a promise that resolves to true if the user confirms, or false if they cancel.
 */
export const askConfirmation = (options: ConfirmationOptions): Promise<boolean> => {
	const { askInternal } = useInternalConfirmDialog();
	return askInternal(options);
};

/**
 * Raises a confirmation dialog for deletion actions.
 */
export const askDeletion = (
	title: string,
	message?: string,
	messageType: "info" | "warning" = "warning",
	confirmBtnKey = "common.actions.delete"
) =>
	askConfirmation({
		title,
		message,
		messageType: messageType,
		confirmBtnKey: confirmBtnKey,
	});

export const askDeletionByTitle = async (itemName: string, itemType: string) => {
	const { t } = useI18nGlobal();

	return await askDeletion(
		t("ui-confirmation-dialog.ask-delete", {
			itemTitle: itemName,
			itemType: i18nKeyExists(itemType) ? t(itemType) : itemType,
		})
	);
};

export const askDeletionByType = async (itemType: string) => {
	const { t } = useI18nGlobal();

	return await askDeletion(
		t("ui-confirmation-dialog.ask-delete-type", {
			itemType: i18nKeyExists(itemType) ? t(itemType) : itemType,
		})
	);
};

export const askCancel = (
	title = "ui-confirmation-dialog.ask-cancel-form",
	message = "ui-confirmation-dialog.ask-cancel-warning-message"
) =>
	askConfirmation({
		title,
		message,
		messageType: "warning",
		confirmBtnKey: "common.actions.discard",
	});
