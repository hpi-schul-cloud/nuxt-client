import { useDeleteConfirmation } from "@/components/feature-confirmation-dialog/delete-confirmation.composable";
import { I18N_KEY, injectStrict } from "@/utils/inject";

export const useDeleteBoardNodeConfirmation = () => {
	const i18n = injectStrict(I18N_KEY);
	const { askConfirmation, isDialogOpen } = useDeleteConfirmation();

	const askDeleteBoardNodeConfirmation = async (
		title: string | undefined,
		type: "boardCard" | "boardElement"
	) => {
		const titleString = title ? `"${title}"` : "";
		const typeString = i18n.t(`components.${type}`).toString();

		const message = i18n
			.t("components.cardHost.deletionModal.confirmation", {
				title: titleString,
				type: typeString,
			})
			.toString();

		const shouldDelete = await askConfirmation({ message });

		return shouldDelete;
	};

	return {
		askDeleteBoardNodeConfirmation,
		isDeleteDialogOpen: isDialogOpen,
	};
};
