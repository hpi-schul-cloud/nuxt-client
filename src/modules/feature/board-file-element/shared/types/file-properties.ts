import { PreviewStatus } from "@/fileStorageApi/v3";
import { FileElementResponse } from "@/serverApi/v3";

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
