import { FileRecord } from "@/types/file/File";
import { useConfirmationDialog } from "@ui-confirmation-dialog";
import { useI18n } from "vue-i18n";

export const useDeleteFilesConfirmationDialog = () => {
	const { t } = useI18n();
	const { askConfirmation, isDialogOpen } = useConfirmationDialog();

	const askDeleteFilesConfirmation = async (
		fileRecords: FileRecord[]
	): Promise<boolean> => {
		const deleteMultipleFiles = fileRecords.length > 1;

		const message = deleteMultipleFiles
			? t("pages.folder.delete-multiple-confirmation", {
					total: fileRecords.length,
				})
			: t("pages.folder.delete-confirmation", {
					name: fileRecords[0].name,
				});

		const shouldDelete = await askConfirmation({
			message,
			confirmActionLangKey: "common.actions.delete",
		});

		return shouldDelete;
	};

	return {
		askDeleteFilesConfirmation,
		isDeleteDialogOpen: isDialogOpen,
	};
};
