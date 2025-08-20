import {
	FilePreviewStatus,
	FileRecord,
	FileRecordParent,
	FileRecordVirusScanStatus,
} from "@/types/file/File";
import { Factory } from "fishery";

export const fileRecordFactory = Factory.define<FileRecord>(({ sequence }) => {
	const id = sequence.toString();
	const name = `file-record #${sequence}.txt`;

	return {
		id,
		url: `${id}/${name}`,
		size: Math.round(Math.random() * 100000),
		name,
		mimeType: "application/octet-stream",
		securityCheckStatus: FileRecordVirusScanStatus.PENDING,
		parentType: FileRecordParent.BOARDNODES,
		parentId: `parentId${sequence}`,
		creatorId: `creatorId${sequence}`,
		schoolId: `schoolId${sequence}`,
		previewStatus: FilePreviewStatus.AWAITING_SCAN_STATUS,
		createdAt: new Date().toISOString(),
		isCollaboraEditable: false,
	};
});
