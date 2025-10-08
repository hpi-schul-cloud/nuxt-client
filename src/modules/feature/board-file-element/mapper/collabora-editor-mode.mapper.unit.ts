import { mapEditBoardPermissionToEditorMode } from "./collabora-editor-mode.mapper";
import { EditorMode } from "@/types/file/File";

describe("mapEditBoardPermissionToEditorMode", () => {
	it("returns EDIT when hasEditPermission is true", () => {
		const result = mapEditBoardPermissionToEditorMode(true);

		expect(result).toBe(EditorMode.EDIT);
	});

	it("returns VIEW when hasEditPermission is false", () => {
		const result = mapEditBoardPermissionToEditorMode(false);

		expect(result).toBe(EditorMode.VIEW);
	});
});
