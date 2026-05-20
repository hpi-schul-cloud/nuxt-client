import type {
	ConfirmationDialogProps,
	CopyDialogProps,
	ImportCardDialogProps,
	ImportCardDialogResult,
	ImportDialogProps,
	ImportDialogResult,
	ShareDialogProps,
} from "./dialog-contracts";
import { defineDialog } from "./dialog-types";
import ConfirmationDialog from "./dialogs/ConfirmationDialog.vue";
import { CopyDialog } from "@feature-copy";
import { ImportCardDialog, ImportDialog } from "@feature-import";
import { ShareDialog } from "@feature-share";

export const dialogRegistry = {
	confirmation: defineDialog<ConfirmationDialogProps, boolean>(ConfirmationDialog),
	copy: defineDialog<CopyDialogProps, boolean>(CopyDialog),
	import: defineDialog<ImportDialogProps, ImportDialogResult>(ImportDialog),
	importCard: defineDialog<ImportCardDialogProps, ImportCardDialogResult>(ImportCardDialog),
	share: defineDialog<ShareDialogProps, void>(ShareDialog),
};
