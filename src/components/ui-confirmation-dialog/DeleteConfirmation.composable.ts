import { useConfirmationDialog } from "./Confirmation.composable";
import { useI18n } from "vue-i18n";

export const useDeleteConfirmationDialog = () => {
	const { t } = useI18n();
	const { askConfirmation, isDialogOpen } = useConfirmationDialog();

	const askDeleteConfirmation = async (
		title: string | undefined,
		type: "boardColumn" | "boardCard" | "boardElement"
	): Promise<boolean> => {
		const titleString = title ? `"${title}"` : "";
		const typeString = t(`components.${type}`);

		const message = t("ui-confirmation-dialog.ask-delete", {
			title: titleString,
			type: typeString,
		});

		const shouldDelete = await askConfirmation({ message });

		return shouldDelete;
	};

	return {
		askDeleteConfirmation,
		isDeleteDialogOpen: isDialogOpen,
	};
};
