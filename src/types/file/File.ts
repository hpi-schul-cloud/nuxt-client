import {
	EditorMode,
	PreviewStatus as FilePreviewStatus,
	PreviewWidth as FilePreviewWidth,
	FileRecordParentType as FileRecordParent,
	FileRecordResponse,
	FileRecordScanStatus as FileRecordVirusScanStatus,
	ParentStatisticResponse,
	PreviewOutputMimeTypes,
	type ArchiveFileParams,
} from "@/fileStorageApi/v3";

export type FileRecord = FileRecordResponse;
export type ParentStatistic = ParentStatisticResponse;

export {
	ArchiveFileParams,
	EditorMode,
	FilePreviewStatus,
	FilePreviewWidth,
	FileRecordParent,
	FileRecordVirusScanStatus,
	PreviewOutputMimeTypes,
};
