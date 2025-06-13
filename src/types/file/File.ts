import {
	ArchiveFileParams,
	PreviewStatus as FilePreviewStatus,
	PreviewWidth as FilePreviewWidth,
	FileRecordParentType as FileRecordParent,
	FileRecordResponse,
	FileRecordScanStatus as FileRecordVirusScanStatus,
	PreviewOutputMimeTypes,
} from "@/fileStorageApi/v3";

export type FileRecord = FileRecordResponse;

export {
	ArchiveFileParams,
	FilePreviewStatus,
	FilePreviewWidth,
	FileRecordParent,
	FileRecordVirusScanStatus,
	PreviewOutputMimeTypes,
};
