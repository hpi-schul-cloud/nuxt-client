import { isMongoId } from "@/utils/validation";
import { RouteLocation, RouteLocationRaw } from "vue-router";

export const boardCardLinkRedirect = (to: RouteLocation): RouteLocationRaw => {
	const pathParam = String(to.params.cardLink).replace(/%23/gi, "#");
	const hashIndex = pathParam.indexOf("#card");
	if (hashIndex === -1) {
		return { name: "error" };
	}

	const boardId = pathParam.substring(0, hashIndex);
	if (!isMongoId(boardId)) {
		return { name: "error" };
	}

	return {
		name: "boards-id",
		params: { id: boardId },
		hash: pathParam.substring(hashIndex),
		query: to.query,
	};
};
