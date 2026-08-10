import { REGEX_ID } from "@/utils/validation";

const BOARD_CARD_LINK_PATH_REGEX = new RegExp(`^/boards/${REGEX_ID}$`);
const BOARD_CARD_LINK_HASH_REGEX = new RegExp(`^#card-${REGEX_ID}$`);

export const ensureProtocolIncluded = (url: string) => {
	if (!url.includes("://")) {
		url = `https://${url}`;
	}
	return new URL(url).toString();
};

export const isBoardCardLink = (url: string, currentHost?: string): boolean => {
	const host = currentHost ?? (typeof window !== "undefined" ? window.location.host : undefined);
	if (!host) return false;
	try {
		const parsedUrl = new URL(url);
		return (
			parsedUrl.host === host &&
			BOARD_CARD_LINK_PATH_REGEX.test(parsedUrl.pathname) &&
			BOARD_CARD_LINK_HASH_REGEX.test(parsedUrl.hash)
		);
	} catch {
		return false;
	}
};
