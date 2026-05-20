import { i18nKeyExists, useI18nGlobal } from "@/plugins/i18n";
import { ConfirmationDialogProps, openDialog } from "@feature-dialog";

export const askConfirmation = async (options: ConfirmationDialogProps): Promise<boolean> => {
	const { completed } = await openDialog("confirmation", options).result;
	return completed;
};

export const askDeletion = (
	title: string,
	message?: string,
	messageType: "info" | "warning" = "warning",
	confirmBtnKey = "common.actions.delete"
) => askConfirmation({ title, message, messageType, confirmBtnKey });

export const askDeletionForItem = async (itemName: string, itemType: string) => {
	const { t } = useI18nGlobal();

	return await askDeletion(
		t("ui-confirmation-dialog.ask-delete", {
			itemTitle: itemName,
			itemType: i18nKeyExists(itemType) ? t(itemType) : itemType,
		})
	);
};

export const askDeletionForType = async (itemType: string) => {
	const { t } = useI18nGlobal();

	return await askDeletion(
		t("ui-confirmation-dialog.ask-delete-type", {
			itemType: i18nKeyExists(itemType) ? t(itemType) : itemType,
		})
	);
};

export const askCancel = (
	title = "ui-confirmation-dialog.ask-cancel-form",
	message = "ui-confirmation-dialog.ask-cancel-warning-message",
	confirmBtnKey = "common.actions.discard"
) =>
	askConfirmation({
		title,
		message,
		messageType: "warning",
		confirmBtnKey,
	});
