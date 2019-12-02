import { striphtml } from "./filter";

describe("@plugins/filter/striphtml", () => {
	it("strips html tags", () => {
		const text = `someText`;
		const html = `<p style="abc"><h1>${text}</h1></p>`;
		expect(striphtml(html)).toBe(text);
	});
});
