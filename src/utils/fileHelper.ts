import {
	FileRecordScanStatus,
	PreviewOutputMimeTypes,
	PreviewStatus,
	PreviewWidth,
} from "@/fileStorageApi/v3";

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
	const ext = fileName.substring(fileName.lastIndexOf(".") + 1);

	return ext;
}

export function convertDownloadToPreviewUrl(
	downloadUrl: string,
	width?: PreviewWidth
): string {
	const previewUrl =
		downloadUrl.replace("download", "preview") +
		`?outputFormat=${PreviewOutputMimeTypes.IMAGE_WEBP}` +
		(width ? `&width=${width}` : "");

	return previewUrl;
}

export function isScanStatusPending(scanStatus: PreviewStatus): boolean {
	return scanStatus === PreviewStatus.AWAITING_SCAN_STATUS;
}

export function isScanStatusWontCheck(scanStatus: PreviewStatus): boolean {
	return (
		scanStatus === PreviewStatus.PREVIEW_NOT_POSSIBLE_SCAN_STATUS_WONT_CHECK
	);
}

export function isScanStatusError(scanStatus: PreviewStatus): boolean {
	return scanStatus === PreviewStatus.PREVIEW_NOT_POSSIBLE_SCAN_STATUS_ERROR;
}

export function isDownloadAllowed(scanStatus: FileRecordScanStatus): boolean {
	return scanStatus !== FileRecordScanStatus.BLOCKED;
}

export function isPreviewPossible(previewStatus: PreviewStatus): boolean {
	return previewStatus === PreviewStatus.PREVIEW_POSSIBLE;
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

export function formatSecondsToHourMinSec(seconds: number) {
	const isoString = new Date(1000 * seconds).toISOString();
	let formattedString = isoString.slice(14, 19);

	const secondsInOneHour = 3600;
	if (seconds >= secondsInOneHour) {
		formattedString = isoString.slice(11, 19);
	}

	return formattedString;
}
