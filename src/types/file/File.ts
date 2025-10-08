import {
	type ArchiveFileParams,
	AuthorizedCollaboraDocumentUrlResponse,
	EditorMode,
	FileRecordListResponse,
	FileRecordParentType as FileRecordParent,
	FileRecordResponse,
	FileRecordScanStatus as FileRecordVirusScanStatus,
	type FileUrlParams,
	ParentStatisticResponse,
	PreviewOutputMimeTypes,
	PreviewStatus as FilePreviewStatus,
	PreviewWidth as FilePreviewWidth,
	type RenameFileParams,
	StorageLocation,
} from "@/fileStorageApi/v3";

export type FileRecord = FileRecordResponse;
export type ParentStatistic = ParentStatisticResponse;

export {
	ArchiveFileParams,
	type AuthorizedCollaboraDocumentUrlResponse,
	EditorMode,
	FilePreviewStatus,
	FilePreviewWidth,
	type FileRecordListResponse,
	FileRecordParent,
	FileRecordVirusScanStatus,
	FileUrlParams,
	PreviewOutputMimeTypes,
	RenameFileParams,
	StorageLocation,
};
