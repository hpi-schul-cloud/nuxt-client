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

export function downloadFile(url: string, fileName: string) {
	const link = document.createElement("a");
	link.href = url;
	link.download = fileName;
	// This functionality adds a hidden <a> element to the page,
	// fires its click event and removes it afterwards, as it is
	// no longer needed and should not clutter the page any further.
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
}
