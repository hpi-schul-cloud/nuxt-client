import {
	FileRecordParentType,
	FileRecordResponse,
	FileRecordScanStatus,
} from "@/fileStorageApi/v3";
import { Factory } from "fishery";

export const fileRecordResponseFactory = Factory.define<FileRecordResponse>(
	({ sequence }) => {
		const id = sequence.toString();
		const name = `file-record #${sequence}.txt`;

		return {
			id,
			url: `${id}/${name}`,
			size: Math.round(Math.random() * 100000),
			name,
			mimeType: "application/octet-stream",
			securityCheckStatus: FileRecordScanStatus.PENDING,
			parentType: FileRecordParentType.BOARDNODES,
			parentId: `parentId${sequence}`,
			creatorId: `creatorId${sequence}`,
			schoolId: `schoolId${sequence}`,
		};
	}
);
