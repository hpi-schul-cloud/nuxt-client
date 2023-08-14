import { I18N_KEY, injectStrict } from "@/utils/inject";
import { useConfirmationDialog } from "./Confirmation.composable";

export const useDeleteConfirmationDialog = () => {
	const i18n = injectStrict(I18N_KEY);
	const { askConfirmation, isDialogOpen } = useConfirmationDialog();

	const askDeleteConfirmation = async (
		title: string | undefined,
		type: "boardColumn" | "boardCard" | "boardElement"
	): Promise<boolean> => {
		const titleString = title ? `"${title}"` : "";
		const typeString = i18n.t(`components.${type}`).toString();

		const message = i18n
			.t("ui-confirmation-dialog.ask-delete", {
				title: titleString,
				type: typeString,
			})
			.toString();

		const shouldDelete = await askConfirmation({ message });

		return shouldDelete;
	};

	return {
		askDeleteConfirmation,
		isDeleteDialogOpen: isDialogOpen,
	};
};
