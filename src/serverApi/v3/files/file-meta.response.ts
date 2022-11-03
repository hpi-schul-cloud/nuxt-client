// ONLY FOR MOCKING, SERVER IMPLEMENTATION FOLLOWS

export enum FileTypeResponse {
	FILE = "file",
	PDF = "pdf",
	DIRECTORY = "dir",
	SHARED_DIRECTORY = "shared_dir",
	FAVORITES = "favorites",
}

export interface FileMetaResponse {
	id: string;
	name: string;
	path: string;
	type: FileTypeResponse;
	size: number;
	lastChanged: Date;
}
