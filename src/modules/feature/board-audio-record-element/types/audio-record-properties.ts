import { PreviewStatus } from "@/fileStorageApi/v3";
import { AudioRecordElementResponse } from "@/serverApi/v3";

export interface AudioRecordProperties {
	name: string;
	size: number;
	url: string;
	previewUrl?: string;
	previewStatus: PreviewStatus;
	isDownloadAllowed: boolean;
	mimeType: string;
	element: AudioRecordElementResponse;
}
