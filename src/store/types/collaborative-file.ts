export enum CollaborativeFileType {
	FAVORITES = "favorites",
	FILE = "draft",
	PDF = "draft",
	DIRECTORY = "dir",
	SHARED_DIRECTORY = "shared_dir",
	UNKNOWN = "question_mark",
}

// styleclass
export enum FileIcon {
	FAVORITE = "favorite",
	FILE = "insert_drive_file",
	FOLDER = "folder",
	SHARED_FOLDER = "folder_shared",
	UNKNOWN = "unknown",
}

export const FileTypeIconMapping = {
	[CollaborativeFileType.FILE]: FileIcon.FILE,
	[CollaborativeFileType.PDF]: FileIcon.FILE,
	[CollaborativeFileType.UNKNOWN]: FileIcon.FILE,
	[CollaborativeFileType.DIRECTORY]: FileIcon.FOLDER,
	[CollaborativeFileType.SHARED_DIRECTORY]: FileIcon.SHARED_FOLDER,
	[CollaborativeFileType.FAVORITES]: FileIcon.FAVORITE,
};

export interface CollaborativeFile {
	name: string;

	path: string;

	icon?: string;

	type: CollaborativeFileType;

	size: number;

	lastChanged: string;

	translationKey?: string;
}
