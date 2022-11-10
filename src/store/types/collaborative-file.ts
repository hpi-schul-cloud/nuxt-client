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

const FileTypeIconMapping = {
	[CollaborativeFileType.FILE]: FileIcon.FILE,
	[CollaborativeFileType.PDF]: FileIcon.FILE,
	[CollaborativeFileType.UNKNOWN]: FileIcon.FILE,
	[CollaborativeFileType.DIRECTORY]: FileIcon.FOLDER,
	[CollaborativeFileType.SHARED_DIRECTORY]: FileIcon.SHARED_FOLDER,
	[CollaborativeFileType.FAVORITES]: FileIcon.FAVORITE,
};

export class CollaborativeFile {
	constructor(
		path: string,
		fileType: CollaborativeFileType,
		size: number,
		name: string,
		lastChanged: Date,
		icon?: FileIcon,
		translationKey?: string
	) {
		this.path = path;
		this.type = fileType;
		this.icon = icon || FileTypeIconMapping[fileType];
		this.size = size;
		this.name = name;
		this.lastChanged = lastChanged;
		this.translationKey = translationKey;
	}

	name: string;

	path: string;

	icon: string;

	type: CollaborativeFileType;

	size: number;

	lastChanged: Date;

	translationKey: string | undefined;
}
