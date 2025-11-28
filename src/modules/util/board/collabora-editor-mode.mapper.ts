import { EditorMode } from "@/types/file/File";

export function mapEditBoardPermissionToEditorMode(hasEditPermission: boolean): string {
	const editorMode = hasEditPermission ? EditorMode.EDIT : EditorMode.VIEW;

	return editorMode;
}
