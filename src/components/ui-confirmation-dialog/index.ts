import ConfirmationDialog from "./ConfirmationDialog.vue";
import setupConfirmationComposableMock from "./test-utils/setupConfirmationComposableMock";
import setupDeleteConfirmationComposableMock from "./test-utils/setupDeleteConfirmationComposableMock";
import { useConfirmationDialog } from "./Confirmation.composable";
import { useDeleteConfirmationDialog } from "./DeleteConfirmation.composable";

export {
	useConfirmationDialog,
	useDeleteConfirmationDialog,
	setupConfirmationComposableMock,
	setupDeleteConfirmationComposableMock,
	ConfirmationDialog,
};
