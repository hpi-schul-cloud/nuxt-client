export const toBase64 = (file: File) =>
	new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result);
		reader.onerror = (error) => reject(error);
	});

/* export const urlToFile = (url, filename, mimeType) => {
  return (fetch(url)
      .then(function(res){return res.arrayBuffer();})
      .then(function(buf){return new File([buf], filename,{ type:mimeType });})
  );
} */

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
	var blobData = typeof bom !== "undefined" ? [bom, data] : [data];
	var blob = new Blob(blobData, { type: mime || "application/octet-stream" });

	// @ts-ignore
	if (typeof window.navigator.msSaveBlob !== "undefined") {
		// @ts-ignore
		window.navigator.msSaveBlob(blob, filename);
	} else {
		var blobURL =
			window.URL && window.URL.createObjectURL
				? window.URL.createObjectURL(blob)
				: window.webkitURL.createObjectURL(blob);
		var tempLink = document.createElement("a");
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
