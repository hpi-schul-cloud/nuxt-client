import {
	PreviewStatus as FilePreviewStatus,
	PreviewWidth as FilePreviewWidth,
	FileRecordParentType as FileRecordParent,
	FileRecordResponse,
	FileRecordScanStatus as FileRecordVirusScanStatus,
} from "@/fileStorageApi/v3";

export type FileRecord = FileRecordResponse;

export {
	FilePreviewStatus,
	FilePreviewWidth,
	FileRecordParent,
	FileRecordVirusScanStatus,
};
