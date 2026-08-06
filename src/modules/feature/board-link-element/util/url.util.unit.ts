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

		describe("when the url is a board card link on the same host", () => {
			it("should return true", () => {
				const url = `https://${host}/boards/${boardId}#card-${cardId}`;

				expect(isBoardCardLink(url, host)).toBe(true);
			});
		});

		describe("when the url is a board card link on a different host", () => {
			it("should return false", () => {
				const url = `https://other.host/boards/${boardId}#card-${cardId}`;

				expect(isBoardCardLink(url, host)).toBe(false);
			});
		});

		describe("when the hash does not target a card", () => {
			it("should return false", () => {
				const url = `https://${host}/boards/${boardId}#column-${cardId}`;

				expect(isBoardCardLink(url, host)).toBe(false);
			});
		});

		describe("when the path is not a board path", () => {
			it("should return false", () => {
				const url = `https://${host}/rooms/${boardId}#card-${cardId}`;

				expect(isBoardCardLink(url, host)).toBe(false);
			});
		});

		describe("when the url is invalid", () => {
			it("should return false", () => {
				expect(isBoardCardLink("not-a-url", host)).toBe(false);
			});
		});
	});
});
