import {
	CollaborativeFile,
	CollaborativeFileType,
} from "@store/types/collaborative-file";
import {
	FileMetaResponse,
	FileTypeResponse,
} from "@store/collaborative-files/file-meta.response";
import { FileMetaListResponse } from "@store/collaborative-files/file-meta-list.response";

const FileTypeMapping = {
	[FileTypeResponse.FILE]: CollaborativeFileType.FILE,
	[FileTypeResponse.PDF]: CollaborativeFileType.PDF,
	[FileTypeResponse.SHARED_DIRECTORY]: CollaborativeFileType.SHARED_DIRECTORY,
	[FileTypeResponse.DIRECTORY]: CollaborativeFileType.DIRECTORY,
	[FileTypeResponse.FAVORITES]: CollaborativeFileType.FAVORITES,
};

export class CollaborativeFileResponseMapper {
	static mapFileMetaListResponse(
		response: FileMetaListResponse
	): CollaborativeFile[] {
		const files: CollaborativeFile[] = response.data.map(
			(fileMeta: FileMetaResponse) => this.mapFileMetaResponse(fileMeta)
		);
		return files;
	}

	private static mapFileMetaResponse(
		fileMeta: FileMetaResponse
	): CollaborativeFile {
		const fileType: CollaborativeFileType = FileTypeMapping[fileMeta.type];
		const file = new CollaborativeFile(
			fileMeta.path,
			fileType,
			fileMeta.size,
			fileMeta.name,
			fileMeta.lastChanged
		);
		return file;
	}
}
