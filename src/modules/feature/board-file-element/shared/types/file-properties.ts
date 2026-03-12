import { PreviewStatus } from "@/generated/fileStorageApi/v3/models";
import { FileElementResponse } from "@/generated/serverApi/v3";

export interface FileProperties {
	name: string;
	size: number;
	url: string;
	previewUrl?: string;
	previewStatus: PreviewStatus;
	isDownloadAllowed: boolean;
	mimeType: string;
	isCollaboraEditable: boolean;
	element: FileElementResponse;
}
