import { CollaboraFileType } from "@/types/enum/Collabora";

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
