import { CollaborativeFileResponseMapper } from "@store/collaborative-files/collaborative-file-response.mapper";
import {
	CollaborativeFile,
	CollaborativeFileType,
	FileIcon,
} from "@store/types/collaborative-file";
import { FileMetaListResponse } from "@store/collaborative-files/file-meta-list.response";
import { FileTypeResponse } from "@store/collaborative-files/file-meta.response";

describe("CollaborativeFileResponseMapper", () => {
	describe("mapFileMetaListResponse", () => {
		it("should map a fileMetaListResponse to collaborativeFile array", () => {
			const response: FileMetaListResponse = {
				data: [
					{
						id: "id",
						name: "FileName",
						size: 38383,
						type: FileTypeResponse.FILE,
						path: "/path/to/fileName",
						lastChanged: new Date(2022, 10, 11),
					},
					{
						id: "id2",
						name: "FileName2",
						size: 2112,
						type: FileTypeResponse.DIRECTORY,
						path: "/path/to/fileName2",
						lastChanged: new Date(2022, 10, 10),
					},
				],
				size: 2,
			};

			const collaborativeFiles: CollaborativeFile[] =
				CollaborativeFileResponseMapper.mapFileMetaListResponse(response);

			expect(collaborativeFiles[0]).toEqual({
				name: "FileName",
				size: 38383,
				type: CollaborativeFileType.FILE,
				path: "/path/to/fileName",
				lastChanged: new Date(2022, 10, 11),
				icon: FileIcon.FILE,
				translationKey: undefined,
			});
		});
	});
});
