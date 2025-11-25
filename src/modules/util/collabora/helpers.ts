import { FileRecordResponse } from "@/fileStorageApi/v3";
import { CollaboraFileType } from "@/types/enum/Collabora";
import { EditorMode } from "@/types/file/File";
import { Router } from "vue-router";

export function mapEditBoardPermissionToEditorMode(hasEditPermission: boolean): string {
	const editorMode = hasEditPermission ? EditorMode.EDIT : EditorMode.VIEW;

	return editorMode;
}

export function getCollaboraAssetUrl(collaboraFileType: CollaboraFileType): string {
	const base = `${window.location.origin}/collabora`;

	if (collaboraFileType === CollaboraFileType.Text) {
		return `${base}/doc.docx`;
	}
	if (collaboraFileType === CollaboraFileType.Spreadsheet) {
		return `${base}/spreadsheet.xlsx`;
	}

	return `${base}/presentation.pptx`;
}

export function openCollabora(router: Router, collaboraFile: FileRecordResponse, hasEditPermission: boolean): void {
	const editorMode = mapEditBoardPermissionToEditorMode(hasEditPermission);
	const url = router.resolve({
		name: "collabora",
		params: {
			id: collaboraFile.id,
		},
		query: {
			editorMode,
		},
	}).href;
	window.open(url, "_blank");
}
