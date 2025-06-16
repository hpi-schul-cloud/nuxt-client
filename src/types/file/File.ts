import {
	ArchiveFileParams,
	PreviewStatus as FilePreviewStatus,
	PreviewWidth as FilePreviewWidth,
	FileRecordParentType as FileRecordParent,
	FileRecordResponse,
	FileRecordScanStatus as FileRecordVirusScanStatus,
	ParentStatisticResponse,
	PreviewOutputMimeTypes,
} from "@/fileStorageApi/v3";

export type FileRecord = FileRecordResponse;
export type ParentStatistic = ParentStatisticResponse;

export {
	ArchiveFileParams,
	FilePreviewStatus,
	FilePreviewWidth,
	FileRecordParent,
	FileRecordVirusScanStatus,
	PreviewOutputMimeTypes,
};
