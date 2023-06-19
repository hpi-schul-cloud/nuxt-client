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

export function downloadFile(
	data: Blob,
	filename: string,
	mime?: string,
	bom?: string
) {
	const blobData = typeof bom !== "undefined" ? [bom, data] : [data];
	const blob = new Blob(blobData, { type: mime || "application/octet-stream" });

	if (typeof window.navigator.msSaveBlob !== "undefined") {
		window.navigator.msSaveBlob(blob, filename);
	} else {
		const blobURL =
			window.URL && window.URL.createObjectURL
				? window.URL.createObjectURL(blob)
				: window.webkitURL.createObjectURL(blob);
		const tempLink = document.createElement("a");
		tempLink.style.display = "none";
		tempLink.href = blobURL;
		tempLink.setAttribute("download", filename);
		if (typeof tempLink.download === "undefined") {
			tempLink.setAttribute("target", "_blank");
		}

		document.body.appendChild(tempLink);
		tempLink.click();

		// Fixes "webkit blob resource error 1"
		setTimeout(function () {
			document.body.removeChild(tempLink);
			window.URL.revokeObjectURL(blobURL);
		}, 200);
	}
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

	const humanReadableFileSize =
		convertedSize.toFixed(numberOfDigits) + " " + unit;

	return humanReadableFileSize;
}

export function getFileExtension(fileName: string): string {
	const ext = fileName.substring(fileName.lastIndexOf(".") + 1);

	return ext;
}
