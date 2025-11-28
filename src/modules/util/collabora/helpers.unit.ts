import { getCollaboraAssetUrl, mapEditBoardPermissionToEditorMode, openCollabora } from "./helpers";
import { CollaboraFileType } from "@/types/enum/Collabora";
import { EditorMode } from "@/types/file/File";
import { fileRecordFactory } from "@@/tests/test-utils/factory/filerecordResponse.factory";
import { createMock } from "@golevelup/ts-vitest";
import { Router } from "vue-router";

vi.mock("vue-router");

describe("getCollaboraAssetUrl", () => {
	it("should return correct URL for CollaboraFileType.Text", () => {
		const url = getCollaboraAssetUrl(CollaboraFileType.Text);
		expect(url).toBe(`${window.location.origin}/collabora/doc.docx`);
	});

	it("should return correct URL for CollaboraFileType.Spreadsheet", () => {
		const url = getCollaboraAssetUrl(CollaboraFileType.Spreadsheet);
		expect(url).toBe(`${window.location.origin}/collabora/spreadsheet.xlsx`);
	});

	it("should return correct URL for CollaboraFileType.Presentation", () => {
		const url = getCollaboraAssetUrl(CollaboraFileType.Presentation);
		expect(url).toBe(`${window.location.origin}/collabora/presentation.pptx`);
	});
});

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

describe("openCollabora", () => {
	const setup = (hasEditPermission: boolean) => {
		const fileRecordResponse = fileRecordFactory.build();

		const router = createMock<Router>();
		const collaboraPageUrl =
			"/collabora/" + fileRecordResponse.id + "?editorMode=" + (hasEditPermission ? "edit" : "view");
		router.resolve.mockReturnValueOnce({ href: collaboraPageUrl });

		return { fileRecordResponse, router };
	};

	it("opens collabora in edit mode when hasEditPermission is true", () => {
		const { fileRecordResponse, router } = setup(true);
		const windowOpenMock = vi.fn();
		const windowOpenSpy = vi.spyOn(window, "open").mockImplementation(windowOpenMock);

		openCollabora(router, fileRecordResponse, true);
		expect(router.resolve).toHaveBeenCalledWith({
			name: "collabora",
			params: { id: fileRecordResponse.id },
			query: { editorMode: EditorMode.EDIT },
		});
		expect(windowOpenSpy).toHaveBeenCalledWith(`/collabora/${fileRecordResponse.id}?editorMode=edit`, "_blank");
		windowOpenSpy.mockRestore();
	});

	it("opens collabora in view mode when hasEditPermission is false", () => {
		const { fileRecordResponse, router } = setup(false);
		const windowOpenMock = vi.fn();
		const windowOpenSpy = vi.spyOn(window, "open").mockImplementation(windowOpenMock);

		openCollabora(router, fileRecordResponse, false);
		expect(router.resolve).toHaveBeenCalledWith({
			name: "collabora",
			params: { id: fileRecordResponse.id },
			query: { editorMode: EditorMode.VIEW },
		});
		expect(windowOpenSpy).toHaveBeenCalledWith(`/collabora/${fileRecordResponse.id}?editorMode=view`, "_blank");
		windowOpenSpy.mockRestore();
	});
});
