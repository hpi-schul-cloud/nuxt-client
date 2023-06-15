import { useDeleteConfirmation } from "@/components/feature-confirmation-dialog/delete-confirmation.composable";
import { I18N_KEY, injectStrict } from "@/utils/inject";
import { DeleteElementEventPayload } from "../types/ContentElement";

export const useDeleteBoardNodeConfirmation = (
	deleteElement: (elementId: string) => Promise<void>
) => {
	const i18n = injectStrict(I18N_KEY);

	const onDeleteElement = async (data: DeleteElementEventPayload) => {
		const { elementId, name } = data;
		const shouldDelete = await askDeleteBoardNodeConfirmation(
			name,
			"boardElement"
		);

		if (shouldDelete) {
			await deleteElement(elementId);
		}
	};

	const askDeleteBoardNodeConfirmation = async (
		title: string | undefined,
		type: "boardCard" | "boardElement"
	) => {
		const message =
			i18n
				.t("components.cardHost.deletionModal.confirmation", {
					title: title ? `"${title}"` : "",
					type: i18n.t(`components.${type}`).toString(),
				})
				.toString() ?? "";

		const { askConfirmation } = useDeleteConfirmation();

		const shouldDelete = await askConfirmation({ message });

		return shouldDelete;
	};

	return {
		onDeleteElement,
		askDeleteBoardNodeConfirmation,
	};
};
