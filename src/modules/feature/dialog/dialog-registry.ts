import { ConfirmationOptions } from "./dialog-contracts";
import { defineDialog } from "./dialog-types";
import ConfirmDialog from "./dialogs/ConfirmDialog.vue";
import PromptDialog from "./dialogs/PromptDialog.vue";
import { ContentItemTypeEnum } from "@/types/enum/content-item-type.enum";
import { CopyDialog } from "@feature-copy";

export const dialogRegistry = {
	confirm: defineDialog<{ title: string; message: string }, boolean>(ConfirmDialog),
	prompt: defineDialog<{ title: string; placeholder?: string; initialValue?: string }, string>(PromptDialog),
	confirmation: defineDialog<ConfirmationOptions, boolean>(ConfirmDialog),
	copy: defineDialog<{ copyItemType: ContentItemTypeEnum }, boolean>(CopyDialog),
};
