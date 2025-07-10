import {
	PreviewStatus as FilePreviewStatus,
	PreviewWidth as FilePreviewWidth,
	FileRecordParentType as FileRecordParent,
	FileRecordResponse,
	FileRecordScanStatus as FileRecordVirusScanStatus,
	ParentStatisticResponse,
	PreviewOutputMimeTypes,
} from "@/fileStorageApi/v3";
import type { ArchiveFileParams } from "@/fileStorageApi/v3/models";

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
