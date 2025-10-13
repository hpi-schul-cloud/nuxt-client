import { useConfirmationDialog } from "./Confirmation.composable";
import { useI18n } from "vue-i18n";

export const useDeleteConfirmationDialog = () => {
	const { t } = useI18n();
	const { askConfirmation, isDialogOpen } = useConfirmationDialog();

	const askDeleteConfirmation = async (title: string | undefined, typeLanguageKey: string): Promise<boolean> => {
		const titleString = title ? ` "${title}"` : "";
		const typeString = t(typeLanguageKey);

		const message = t("ui-confirmation-dialog.ask-delete", {
			title: titleString,
			type: typeString,
		});

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
