import { FileInteractionType } from "../shared/types/file-interaction-types";
import { useFileInteractionType } from "./file-interaction-type.composable";

describe("useFileInteractionType", () => {
	it("should return none when no file record is available", () => {
		const result = useFileInteractionType({
			hasFileRecord: false,
			isCollaboraEnabled: false,
			isCollaboraEditable: false,
			mimeType: "application/pdf",
			hasPreviewUrl: false,
			isDownloadAllowed: true,
		});

		expect(result).toBe(FileInteractionType.None);
	});

	it("should return collabora when collabora is enabled and editable", () => {
		const result = useFileInteractionType({
			hasFileRecord: true,
			isCollaboraEnabled: true,
			isCollaboraEditable: true,
			mimeType: "application/vnd.oasis.opendocument.text",
			hasPreviewUrl: false,
			isDownloadAllowed: true,
		});

		expect(result).toBe(FileInteractionType.Collabora);
	});

	it("should return pdf for pdf mime type", () => {
		const result = useFileInteractionType({
			hasFileRecord: true,
			isCollaboraEnabled: false,
			isCollaboraEditable: false,
			mimeType: "application/pdf",
			hasPreviewUrl: false,
			isDownloadAllowed: true,
		});

		expect(result).toBe(FileInteractionType.Pdf);
	});

	it("should return image when preview url is available", () => {
		const result = useFileInteractionType({
			hasFileRecord: true,
			isCollaboraEnabled: false,
			isCollaboraEditable: false,
			mimeType: "image/png",
			hasPreviewUrl: true,
			isDownloadAllowed: true,
		});

		expect(result).toBe(FileInteractionType.Image);
	});

	it("should return none for video mime type", () => {
		const result = useFileInteractionType({
			hasFileRecord: true,
			isCollaboraEnabled: false,
			isCollaboraEditable: false,
			mimeType: "video/mp4",
			hasPreviewUrl: false,
			isDownloadAllowed: true,
		});

		expect(result).toBe(FileInteractionType.None);
	});

	it("should return none for audio mime type", () => {
		const result = useFileInteractionType({
			hasFileRecord: true,
			isCollaboraEnabled: false,
			isCollaboraEditable: false,
			mimeType: "audio/mp4",
			hasPreviewUrl: false,
			isDownloadAllowed: true,
		});

		expect(result).toBe(FileInteractionType.None);
	});

	it("should return download for fallback downloadable files", () => {
		const result = useFileInteractionType({
			hasFileRecord: true,
			isCollaboraEnabled: false,
			isCollaboraEditable: false,
			mimeType: "application/zip",
			hasPreviewUrl: false,
			isDownloadAllowed: true,
		});

		expect(result).toBe(FileInteractionType.Download);
	});

	it("should return none for fallback non-downloadable files", () => {
		const result = useFileInteractionType({
			hasFileRecord: true,
			isCollaboraEnabled: false,
			isCollaboraEditable: false,
			mimeType: "application/zip",
			hasPreviewUrl: false,
			isDownloadAllowed: false,
		});

		expect(result).toBe(FileInteractionType.None);
	});

	it("should return none when mime type is missing", () => {
		const result = useFileInteractionType({
			hasFileRecord: true,
			isCollaboraEnabled: false,
			isCollaboraEditable: false,
			mimeType: undefined,
			hasPreviewUrl: false,
			isDownloadAllowed: true,
		});

		expect(result).toBe(FileInteractionType.None);
	});
});
