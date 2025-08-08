import {
	ArchiveFileParams,
	FilePreviewStatus,
	FilePreviewWidth,
	FileRecordVirusScanStatus,
	PreviewOutputMimeTypes,
} from "@/types/file/File";

export const toBase64 = (file: File) =>
	new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result);
		reader.onerror = (error) => reject(error);
	});

export function downloadFile(url: string, fileName: string) {
	const link = document.createElement("a");
	link.href = url;
	link.download = fileName;
	link.hidden = true;
	// This functionality adds a hidden <a> element to the page,
	// fires its click event and removes it afterwards, as it is
	// no longer needed and should not clutter the page any further.
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
}

// This function is used to download multiple files as a zip archive.
// It creates a form with the necessary parameters and submits it to the server.
// The server will then create the zip archive and return it as a file download.
export function downloadFilesAsArchive(params: ArchiveFileParams) {
	const form = document.createElement("form");
	form.method = "POST";
	form.action = "/api/v3/file/download-files-as-archive";
	form.enctype = "application/json";
	form.target = "_blank";

	const archiveNameInput = document.createElement("input");
	archiveNameInput.type = "hidden";
	archiveNameInput.name = "archiveName";
	archiveNameInput.value = params.archiveName;

	const fileRecordIdsInput = document.createElement("input");
	fileRecordIdsInput.type = "hidden";
	fileRecordIdsInput.name = "fileRecordIds";
	fileRecordIdsInput.value = JSON.stringify(params.fileRecordIds);

	form.appendChild(fileRecordIdsInput);
	form.appendChild(archiveNameInput);

	document.body.appendChild(form);
	form.submit();
	document.body.removeChild(form);
}

export function convertFileSize(fileSize: number): {
	convertedSize: number;
	unit: string;
} {
	const units = ["B", "KB", "MB", "GB"];
	const threshold = 1024;

	let convertedSize = fileSize < 0 ? 0 : fileSize;
	let unit = units[0];
	let power = 1;

	while (convertedSize >= threshold && units.length > power) {
		convertedSize /= threshold;
		unit = units[power];
		power++;
	}

	return { convertedSize, unit };
}

export function getFileExtension(fileName: string): string {
	const extension = fileName.substring(fileName.lastIndexOf(".") + 1);

	return extension;
}

export function removeFileExtension(str: string): string {
	const lastDotIndex = str.lastIndexOf(".");

	const extensionNotFound = lastDotIndex === -1;

	if (extensionNotFound) {
		return str;
	}

	const stringWithoutExtension = str.substring(0, lastDotIndex);

	return stringWithoutExtension;
}

export function convertDownloadToPreviewUrl(
	downloadUrl: string,
	width?: FilePreviewWidth
): string {
	const previewUrl =
		downloadUrl.replace("download", "preview") +
		`?outputFormat=${PreviewOutputMimeTypes.IMAGE_WEBP}` +
		(width ? `&width=${width}` : "");

	return previewUrl;
}

export function isScanStatusPending(scanStatus: FilePreviewStatus): boolean {
	return scanStatus === FilePreviewStatus.AWAITING_SCAN_STATUS;
}

export function isScanStatusWontCheck(scanStatus: FilePreviewStatus): boolean {
	return (
		scanStatus === FilePreviewStatus.PREVIEW_NOT_POSSIBLE_SCAN_STATUS_WONT_CHECK
	);
}

export function isScanStatusError(scanStatus: FilePreviewStatus): boolean {
	return (
		scanStatus === FilePreviewStatus.PREVIEW_NOT_POSSIBLE_SCAN_STATUS_ERROR
	);
}

export function isScanStatusBlocked(
	scanStatus: FileRecordVirusScanStatus
): boolean {
	return scanStatus !== FileRecordVirusScanStatus.BLOCKED;
}

export function isPreviewPossible(previewStatus: FilePreviewStatus): boolean {
	return previewStatus === FilePreviewStatus.PREVIEW_POSSIBLE;
}

export function isVideoMimeType(mimeType: string): boolean {
	return (
		mimeType.startsWith("video/") ||
		mimeType === "application/x-mpegURL" ||
		mimeType === "application/vnd.ms-asf" ||
		mimeType === "application/ogg"
	);
}

export function isPdfMimeType(mimeType: string): boolean {
	return mimeType === "application/pdf";
}

export function isAudioMimeType(mimeType: string): boolean {
	return mimeType.startsWith("audio/");
}

export function isCollaboraMimeType(mimeType: string): boolean {
	const textMimeTypes = [
		"application/vnd.openxmlformats-officedocument.wordprocessingml.document",
		"application/msword",
		"application/vnd.oasis.opendocument.text",
		"application/rtf",
		"text/plain",
	];

	const spreadsheetMimeTypes = [
		"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
		"application/vnd.ms-excel",
		"application/vnd.oasis.opendocument.spreadsheet",
		"text/csv",
	];

	const presentationMimeTypes = [
		"application/vnd.openxmlformats-officedocument.presentationml.presentation",
		"application/vnd.ms-powerpoint",
		"application/vnd.oasis.opendocument.presentation",
	];

	const collaboraMimeTypes = [
		...textMimeTypes,
		...spreadsheetMimeTypes,
		...presentationMimeTypes,
	];

	const isCollaboraMimeType = collaboraMimeTypes.includes(mimeType);

	return isCollaboraMimeType;
}

export function formatSecondsToHourMinSec(seconds: number) {
	const isoString = new Date(1000 * seconds).toISOString();
	let formattedString = isoString.slice(14, 19);

	const secondsInOneHour = 3600;
	if (seconds >= secondsInOneHour) {
		formattedString = isoString.slice(11, 19);
	}

	return formattedString;
}
