import { useConfirmationDialog } from "./Confirmation.composable";
import { useI18n } from "vue-i18n";

export const useDeleteConfirmationDialog = () => {
	const { t } = useI18n();
	const { askConfirmation, isDialogOpen } = useConfirmationDialog();

	const askDeleteConfirmation = async (
		title: string | undefined,
		typeLanguageKey: string,
		fullText?: string | undefined
	): Promise<boolean> => {
		const titleString = title ? ` "${title}"` : "";
		const typeString = t(typeLanguageKey);

		let message = t("ui-confirmation-dialog.ask-delete", {
			title: titleString,
			type: typeString,
		});

		if (fullText) {
			message = fullText;
		}

		const shouldDelete = await askConfirmation({
			message,
			confirmActionLangKey: "common.actions.delete",
		});

		return shouldDelete;
	};

	return {
		askDeleteConfirmation,
		isDeleteDialogOpen: isDialogOpen,
	};
};
