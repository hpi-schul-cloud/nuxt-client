import { PreviewStatus } from "@api-file-storage/models";
import { FileElementResponse } from "@api-server";

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
