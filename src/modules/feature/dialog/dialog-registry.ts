import { ConfirmationOptions } from "./dialog-contracts";
import { defineDialog } from "./dialog-types";
import ConfirmDialog from "./dialogs/ConfirmDialog.vue";
import PromptDialog from "./dialogs/PromptDialog.vue";
import { ContentItemTypeEnum } from "@/types/enum/content-item-type.enum";
import { ShareTokenBodyParamsParentType, ShareTokenInfoResponse } from "@api-server";
import { CopyDialog } from "@feature-copy";
import {
	ImportCardDialog,
	ImportDestination,
	ImportDestinationItem,
	ImportDestinationType,
	ImportDialog,
} from "@feature-import";
import type { ShareOptions } from "@feature-share";
import { ShareDialog } from "@feature-share";

export const dialogRegistry = {
	confirm: defineDialog<{ title: string; message: string }, boolean>(ConfirmDialog),
	prompt: defineDialog<{ title: string; placeholder?: string; initialValue?: string }, string>(PromptDialog),
	confirmation: defineDialog<ConfirmationOptions, boolean>(ConfirmDialog),
	copy: defineDialog<{ copyItemType: ContentItemTypeEnum }, boolean>(CopyDialog),
	import: defineDialog<
		{
			shareTokenInfo: ShareTokenInfoResponse;
			availableDestinations: ImportDestinationItem[];
			destinationType: Extract<ImportDestinationType, "room" | "course">;
		},
		{ newName: string; destination?: ImportDestination }
	>(ImportDialog),
	importCard: defineDialog<
		{
			shareTokenInfo: ShareTokenInfoResponse;
			availableDestinations: { id: string; name: string }[];
			destinationType: Extract<ImportDestinationType, "column">;
		},
		{ newName: string; destination?: ImportDestination }
	>(ImportCardDialog),
	share: defineDialog<
		{
			shareItemType: ShareTokenBodyParamsParentType;
			onConfirm: (options: ShareOptions) => Promise<string>;
		},
		void
	>(ShareDialog),
};
