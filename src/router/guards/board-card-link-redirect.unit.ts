import { boardCardLinkRedirect } from "@/router/guards/board-card-link-redirect";
import { RouteLocation } from "vue-router";

const VALID_BOARD_ID = "6a393517b95e95fad4a3484b";
const VALID_CARD_HASH = "#card-6a3a5046070d617ccc4cceb6";

const buildRoute = (cardLink: string, query = {}): RouteLocation =>
	({ params: { cardLink }, query }) as unknown as RouteLocation;

describe("boardCardLinkRedirect", () => {
	describe("when the param contains a valid board id and a #card hash", () => {
		it("should redirect to boards-id with the correct params and hash", () => {
			const to = buildRoute(`${VALID_BOARD_ID}${VALID_CARD_HASH}`);

			const result = boardCardLinkRedirect(to);

			expect(result).toEqual({
				name: "boards-id",
				params: { id: VALID_BOARD_ID },
				hash: VALID_CARD_HASH,
				query: {},
			});
		});

		it("should forward query parameters to the redirect target", () => {
			const query = { foo: "bar" };
			const to = buildRoute(`${VALID_BOARD_ID}${VALID_CARD_HASH}`, query);

			const result = boardCardLinkRedirect(to);

			expect(result).toEqual(expect.objectContaining({ query }));
		});
	});

	describe("when the param does not contain #card", () => {
		it("should redirect to the error route", () => {
			const to = buildRoute(VALID_BOARD_ID);

			const result = boardCardLinkRedirect(to);

			expect(result).toEqual({ name: "error" });
		});

		it("should redirect to boards-id when '#' is percent-encoded as '%23'", () => {
			const encodedCardLink = `${VALID_BOARD_ID}${VALID_CARD_HASH.replace(/#/g, "%23")}`;
			const to = buildRoute(encodedCardLink);

			const result = boardCardLinkRedirect(to);

			expect(result).toEqual({
				name: "boards-id",
				params: { id: VALID_BOARD_ID },
				hash: VALID_CARD_HASH,
				query: {},
			});
		});
	});

	describe("when the part before #card is not a valid mongo id", () => {
		it("should redirect to the error route", () => {
			const to = buildRoute(`not-a-valid-id${VALID_CARD_HASH}`);

			const result = boardCardLinkRedirect(to);

			expect(result).toEqual({ name: "error" });
		});
	});
});
