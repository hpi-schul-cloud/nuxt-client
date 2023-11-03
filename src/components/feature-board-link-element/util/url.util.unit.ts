import { ensureProtocolIncluded } from "./url.util";

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
});
