import {
	PreviewWidth as FilePreviewWidth,
	FileRecordParentType as FileRecordParent,
	FileRecordResponse,
	PreviewWidth,
} from "@/fileStorageApi/v3";

export type FileRecord = FileRecordResponse;
export type PreviewWidths = PreviewWidth;

export { FilePreviewWidth, FileRecordParent };
