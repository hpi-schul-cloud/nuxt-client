import {
	PreviewStatus as FilePreviewStatus,
	PreviewWidth as FilePreviewWidth,
	FileRecordParentType as FileRecordParent,
	FileRecordResponse,
	FileRecordScanStatus as FileRecordVirusScanStatus,
	PreviewWidth,
} from "@/fileStorageApi/v3";

export type FileRecord = FileRecordResponse;
export type PreviewWidths = PreviewWidth;

export {
	FilePreviewStatus,
	FilePreviewWidth,
	FileRecordParent,
	FileRecordVirusScanStatus,
};
