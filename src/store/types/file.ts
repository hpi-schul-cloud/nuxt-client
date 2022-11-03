export enum FileType {
	FAVORITES = "favorites",
	FILE = "file",
	PDF = "pdf",
	DIRECTORY = "dir",
	SHARED_DIRECTORY = "shared_dir",
	UNKNOWN = "unknown",
}

// styleclass
export enum FileIcon {
	FAVORITE = "favorite",
	FILE = "file",
	FOLDER = "folder",
	SHARED_FOLDER = "folder_shared",
	UNKNOWN = "unknown",
}

const FileTypeIconMapping = {
	[FileType.FILE]: FileIcon.FILE,
	[FileType.PDF]: FileIcon.FILE,
	[FileType.UNKNOWN]: FileIcon.FILE,
	[FileType.DIRECTORY]: FileIcon.FOLDER,
	[FileType.SHARED_DIRECTORY]: FileIcon.SHARED_FOLDER,
	[FileType.FAVORITES]: FileIcon.FAVORITE,
};

export class File {
	constructor(
		path: string,
		fileType: FileType,
		size: number,
		name: string,
		lastChanged: Date,
		icon?: FileIcon
	) {
		this.path = path;
		this.type = fileType;
		this.icon = icon || FileTypeIconMapping[fileType];
		this.size = size;
		this.name = name;
		this.lastChanged = lastChanged;
	}

	name: string;

	path: string;

	icon: string;

	type: FileType;

	size: number;

	lastChanged: Date;
}
