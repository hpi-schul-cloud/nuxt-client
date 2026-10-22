const TEASER_MAX_LENGTH = 80;
const BLOCK_BREAK_REGEX = /<\/?(?:p|div|li|h[1-6]|blockquote|tr)>|<br\s*\/?>/gi;
const VISIBLE_MARKUP_SELECTOR = "hr, table, img";

const parseHtml = (html: string) => new DOMParser().parseFromString(html, "text/html").body;

const toPlainText = (html: string): string => {
	const text = parseHtml(html.replace(BLOCK_BREAK_REGEX, "$& ")).textContent ?? "";

	return text.replace(/\s+/g, " ").trim();
};

export const toTeaser = (html: string): string => toPlainText(html).slice(0, TEASER_MAX_LENGTH);

export const hasVisibleMarkup = (html: string): boolean =>
	parseHtml(html).querySelector(VISIBLE_MARKUP_SELECTOR) !== null;

export const toDomain = (url: string): string => {
	try {
		const hostname = new URL(url.includes("://") ? url : `https://${url}`).hostname;

		return hostname.replace(/^www\./, "");
	} catch {
		return "";
	}
};
