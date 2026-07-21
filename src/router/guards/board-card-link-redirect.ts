import { REGEX_ID } from "@/utils/validation";
import { RouteLocation, RouteLocationRaw } from "vue-router";

const CARD_LINK_REGEX = new RegExp(`^(${REGEX_ID})(?:#|%23)card-(${REGEX_ID})$`);

export const boardCardLinkRedirect = (to: RouteLocation): RouteLocationRaw => {
	const match = String(to.params.cardLink).match(CARD_LINK_REGEX);

	if (!match) {
		return { name: "error" };
	}

	const [_, boardId, cardId] = match;

	return {
		name: "boards-id",
		params: { id: boardId },
		hash: `#card-${cardId}`,
		query: to.query,
	};
};
