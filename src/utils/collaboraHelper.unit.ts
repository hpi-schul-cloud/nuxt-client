import { CollaboraFileType } from "@/types/enum/Collabora";
import { getCollaboraAssetUrl } from "@/utils/collaboraHelper";

describe("@/utils/collaboraHelper", () => {
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
});
