export const ensureProtocolIncluded = (url: string) => {
	if (!url.includes("://")) {
		url = `https://${url}`;
	}
	return new URL(url).toString();
};
