import { ensureProtocolIncluded, isBoardCardLink } from "./url.util";
import { ObjectIdMock } from "@@/tests/test-utils";

describe("url.util", () => {
	describe("ensureProtocolIncluded", () => {
		describe("when a protocol is contained", () => {
			it("should not change anything", async () => {
				const url = "anyprotocol://abc.de/foto.png";
				const result = ensureProtocolIncluded(url);
				expect(result).toEqual(url);
			});
		});

		describe("when no protocol is contained", () => {
			it("should add https", async () => {
				const url = "abc.de/foto.png";
				const result = ensureProtocolIncluded(url);
				expect(result.indexOf("https://")).toEqual(0);
			});
		});
	});

	describe("isBoardCardLink", () => {
		const host = "dbildungscloud.test";
		const boardId = ObjectIdMock();
		const cardId = ObjectIdMock();

		it("should return true for a card link on the same host", () => {
			const url = `https://${host}/boards/${boardId}#card-${cardId}`;

			expect(isBoardCardLink(url, host)).toBe(true);
		});

		it("should return false for a card link on a different host", () => {
			const url = `https://other.host/boards/${boardId}#card-${cardId}`;

			expect(isBoardCardLink(url, host)).toBe(false);
		});

		it("should return false when the hash is not a card hash", () => {
			const url = `https://${host}/boards/${boardId}#column-${cardId}`;

			expect(isBoardCardLink(url, host)).toBe(false);
		});

		it("should return false when the path is not a board path", () => {
			const url = `https://${host}/rooms/${boardId}#card-${cardId}`;

			expect(isBoardCardLink(url, host)).toBe(false);
		});

		it("should return false for an invalid url", () => {
			expect(isBoardCardLink("not-a-url", host)).toBe(false);
		});
	});
});
