import { ShareOptions } from "../share/types";
import { ContentItemTypeEnum } from "@/types/enum/content-item-type.enum";
import { ShareTokenBodyParamsParentType, ShareTokenInfoResponse } from "@api-server";
import { ImportDestination, ImportDestinationItem, ImportDestinationType } from "@feature-import";

export type ConfirmationDialogProps = {
	title: string;
	message?: string;
	messageType?: "warning" | "info";
	confirmBtnKey?: string;
};

export type CopyDialogProps = { copyItemType: ContentItemTypeEnum };

export type ImportDialogProps = {
	shareTokenInfo: ShareTokenInfoResponse;
	availableDestinations: ImportDestinationItem[];
	destinationType: Extract<ImportDestinationType, "room" | "course">;
};
export type ImportDialogResult = { newName: string; destination?: ImportDestination };

export type ImportCardDialogProps = {
	shareTokenInfo: ShareTokenInfoResponse;
	availableDestinations: { id: string; name: string }[];
	destinationType: Extract<ImportDestinationType, "column">;
};
export type ImportCardDialogResult = ImportDialogResult;

export type ShareDialogProps = {
	shareItemType: ShareTokenBodyParamsParentType;
	onConfirm: (options: ShareOptions) => Promise<string>;
};

export type LoadingStateDialogProps = {
	loadingText: string;
};
