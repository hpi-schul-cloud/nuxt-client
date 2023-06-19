export const toBase64 = (file: File) =>
	new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result);
		reader.onerror = (error) => reject(error);
	});

export async function dataUrlToFile(
	dataUrl: string,
	fileName: string
): Promise<File | null> {
	if (!dataUrl) return null;
	const res: Response = await fetch(dataUrl);
	const blob: Blob = await res.blob();
	return new File([blob], fileName, { type: "image/png" });
}

export function convertFileSizeToHumanReadable(
	fileSize: number,
	numberOfDigits = 2
): string {
	const units = ["B", "KB", "MB", "GB", "TB"];
	const threshold = 1024;

	let convertedSize = fileSize;
	let unit = units[0];
	let power = 1;

	while (convertedSize >= threshold && units.length >= power) {
		convertedSize /= threshold;
		unit = units[power];
		power++;
	}

	const localeString = convertedSize.toLocaleString("de-DE", {
		minimumFractionDigits: numberOfDigits,
		maximumFractionDigits: numberOfDigits,
	});

	const humanReadableFileSize = localeString + " " + unit;

	return humanReadableFileSize;
}

export function getFileExtension(fileName: string): string {
	const ext = fileName.substring(fileName.lastIndexOf(".") + 1);

	return ext;
}
