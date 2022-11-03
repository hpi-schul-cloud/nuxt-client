import { FileMetaResponse } from "@/serverApi/v3/files/file-meta.response";

// ONLY FOR MOCKING, SERVER IMPLEMENTATION FOLLOWS

export interface FileMetaListResponse {
	data: FileMetaResponse[];
	size: number;
}
