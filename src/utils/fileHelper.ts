export const toBase64 = (file: File) =>
	new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result);
		reader.onerror = (error) => reject(error);
	});

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
