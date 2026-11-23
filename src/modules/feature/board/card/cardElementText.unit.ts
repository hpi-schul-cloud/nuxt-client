import { hasVisibleMarkup, toDomain, toTeaser } from "./cardElementText";

describe("cardElementText", () => {
	describe("toTeaser", () => {
		it("should separate blocks and collapse whitespace", () => {
			expect(toTeaser("<h2>Title</h2><p>First&nbsp; line<br>second   line</p>")).toBe("Title First line second line");
		});

		it("should shorten long text to 80 characters", () => {
			expect(toTeaser(`<p>${"a".repeat(100)}</p>`)).toHaveLength(80);
		});

		it("should be empty for markup without text", () => {
			expect(toTeaser("<p>&nbsp;</p><hr>")).toBe("");
		});
	});

	describe("hasVisibleMarkup", () => {
		it.each([
			["a horizontal line", "<hr>"],
			["a table", "<table><tbody><tr><td></td></tr></tbody></table>"],
			["an image", '<img src="image.png" alt="">'],
		])("should detect %s", (_name, html) => {
			expect(hasVisibleMarkup(html)).toBe(true);
		});

		it("should not detect empty paragraphs", () => {
			expect(hasVisibleMarkup("<p>&nbsp;</p>")).toBe(false);
		});
	});

	describe("toDomain", () => {
		it("should return the hostname without www", () => {
			expect(toDomain("https://www.example.org/path?query=1")).toBe("example.org");
		});

		it("should accept urls without protocol", () => {
			expect(toDomain("example.org/path")).toBe("example.org");
		});

		it("should be empty for invalid urls", () => {
			expect(toDomain("http://")).toBe("");
		});
	});
});
