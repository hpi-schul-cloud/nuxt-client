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
