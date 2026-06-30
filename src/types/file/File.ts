import {
	AddDocumentToParentParams,
	type ArchiveFileParams,
	AuthorizedCollaboraDocumentUrlResponse,
	DocumentType,
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
} from "@api-file-storage";

export type FileRecord = FileRecordResponse;
export type ParentStatistic = ParentStatisticResponse;

export {
	type AddDocumentToParentParams,
	ArchiveFileParams,
	type AuthorizedCollaboraDocumentUrlResponse,
	DocumentType,
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
