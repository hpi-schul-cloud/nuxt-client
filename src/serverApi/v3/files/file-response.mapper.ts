import {
	FileMetaResponse,
	FileTypeResponse,
} from "@/serverApi/v3/files/file-meta.response";
import { FileMetaListResponse } from "@/serverApi/v3/files/file-meta-list.response";
import { File, FileType } from "@store/types/file";

const FileTypeMapping = {
	[FileTypeResponse.FILE]: FileType.FILE,
	[FileTypeResponse.PDF]: FileType.PDF,
	[FileTypeResponse.SHARED_DIRECTORY]: FileType.SHARED_DIRECTORY,
	[FileTypeResponse.DIRECTORY]: FileType.DIRECTORY,
	[FileTypeResponse.FAVORITES]: FileType.FAVORITES,
};

export class FileResponseMapper {
	static mapFileMetaListResponse(response: FileMetaListResponse): File[] {
		const files: File[] = response.data.map((fileMeta: FileMetaResponse) =>
			this.mapFileMetaResponse(fileMeta)
		);
		return files;
	}

	private static mapFileMetaResponse(fileMeta: FileMetaResponse): File {
		const fileType: FileType = FileTypeMapping[fileMeta.type];
		const file = new File(
			fileMeta.path,
			fileType,
			fileMeta.size,
			fileMeta.name,
			fileMeta.lastChanged
		);
		return file;
	}
}
