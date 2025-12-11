import { CollaboraFileType } from "@data-file";

export type CreateCollaboraFilePayload = {
	type: CollaboraFileType;
	fileName: string;
};
