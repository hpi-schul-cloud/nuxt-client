const inlineFileSourcePattern = /<(?:img|audio|video)\b[^>]*\bsrc=["']([^"']+)["']/gi;
const fileDownloadPathPattern = /\/api\/v3\/file\/download\/([^/?#]+)/i;

export const extractReferencedTaskFileIds = (description?: string): string[] => {
	if (!description) return [];

	const fileIds = new Set<string>();
	for (const match of description.matchAll(inlineFileSourcePattern)) {
		const fileId = match[1]?.match(fileDownloadPathPattern)?.[1];
		if (fileId) fileIds.add(fileId);
	}

	return [...fileIds];
};
