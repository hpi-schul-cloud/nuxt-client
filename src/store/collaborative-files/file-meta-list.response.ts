import { FileMetaResponse } from "@/store/collaborative-files/file-meta.response";

// ONLY FOR MOCKING, SERVER IMPLEMENTATION FOLLOWS

export interface FileMetaListResponse {
	data: FileMetaResponse[];
	size: number;
}
