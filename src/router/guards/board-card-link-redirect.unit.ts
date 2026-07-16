import { boardCardLinkRedirect } from "@/router/guards/board-card-link-redirect";
import { RouteLocation } from "vue-router";

const VALID_BOARD_ID = "6a393517b95e95fad4a3484b";
const VALID_ANCHOR_NAME = "#card-6a3a5046070d617ccc4cceb6";
const INVALID_CARD_HASH = "_invalid-card-hash";

const buildRoute = (boardId: string, anchorName: string): RouteLocation =>
	({ params: { cardLink: `${boardId}${anchorName}` }, query: {} }) as unknown as RouteLocation;

describe("boardCardLinkRedirect", () => {
	describe("when the param contains a valid board id and a #card hash", () => {
		it("should redirect to boards-id with the correct params and hash", () => {
			const to = buildRoute(VALID_BOARD_ID, VALID_ANCHOR_NAME);

			const result = boardCardLinkRedirect(to);

			expect(result).toEqual({
				name: "boards-id",
				params: { id: VALID_BOARD_ID },
				hash: VALID_ANCHOR_NAME,
				query: {},
			});
		});

		it("should forward query parameters to the redirect target", () => {
			const query = { foo: "bar" };
			const to = { ...buildRoute(VALID_BOARD_ID, VALID_ANCHOR_NAME), query } as RouteLocation;

			const result = boardCardLinkRedirect(to);

			expect(result).toEqual(expect.objectContaining({ query }));
		});
	});

	describe("when the param does not contain '#card'", () => {
		it("should redirect to the error route", () => {
			const to = buildRoute(VALID_BOARD_ID, INVALID_CARD_HASH);

			const result = boardCardLinkRedirect(to);

			expect(result).toEqual({ name: "error" });
		});

		it("should redirect to boards-id when '#card' is percent-encoded as '%23card'", () => {
			const to = buildRoute(VALID_BOARD_ID, VALID_ANCHOR_NAME.replace(/#card/g, "%23card"));

			const result = boardCardLinkRedirect(to);

			expect(result).toEqual({
				name: "boards-id",
				params: { id: VALID_BOARD_ID },
				hash: VALID_ANCHOR_NAME,
				query: {},
			});
		});
	});

	describe("when the part before #card is not a valid mongo id", () => {
		it("should redirect to the error route", () => {
			const to = buildRoute("not-a-valid-mongo-id", VALID_ANCHOR_NAME);

			const result = boardCardLinkRedirect(to);

			expect(result).toEqual({ name: "error" });
		});
	});
});
