import { decodeHtmlEntities, toKebabCase, upperCaseFirstChar } from "./textFormatting";

describe("@/utils/textFormatting", () => {
	describe("upperCaseFirstChar", () => {
		it.each([
			["alllowercase", "Alllowercase"],
			["withUppercaseLetters", "WithUppercaseLetters"],
			["ALLCAPS", "ALLCAPS"],
		])("%p gets formatted to %p", (input, output) => {
			expect(upperCaseFirstChar(input)).toBe(output);
		});
	});

	describe("toKebabCase", () => {
		it.each([
			["no", "no"],
			["camelCase", "camel-case"],
			["PascalCase", "pascal-case"],
			["ALLCAPS", "a-l-l-c-a-p-s"],
		])("%p gets formatted to %p", (input, output) => {
			expect(toKebabCase(input)).toBe(output);
		});
	});

	describe("decodeHtmlEntities", () => {
		it.each([
			// Named HTML entities
			["&lt;", "<"],
			["&gt;", ">"],
			["&amp;", "&"],
			["&quot;", '"'],
			["&#39;", "'"],
			["&nbsp;", "\u00A0"],

			// Numeric entities (decimal)
			["&#60;", "<"],
			["&#62;", ">"],
			["&#38;", "&"],
			["&#34;", '"'],
			["&#39;", "'"],

			// Numeric entities (hexadecimal)
			["&#x3C;", "<"],
			["&#x3E;", ">"],
			["&#x26;", "&"],
			["&#x22;", '"'],
			["&#x27;", "'"],

			// Plain text (no entities)
			["Hello World", "Hello World"],
			["No entities here", "No entities here"],
			["", ""],

			// Mixed content
			["AT&amp;T &amp; Verizon", "AT&T & Verizon"],
			["&lt;script&gt;alert(&#39;Hello&#39;);&lt;/script&gt;", "<script>alert('Hello');</script>"],
			["Price: &#36;100 &amp; free shipping", "Price: $100 & free shipping"],

			// Complex real-world examples
			[
				"H5P: &quot;Interactive Video&quot; &amp; &lt;Learning Games&gt;",
				'H5P: "Interactive Video" & <Learning Games>',
			],
			["Math: 5 &lt; 10 &amp;&amp; 10 &gt; 5", "Math: 5 < 10 && 10 > 5"],
			["Company: Johnson &amp; Johnson&#39;s", "Company: Johnson & Johnson's"],

			// Edge cases
			["&lt;&gt;&quot;&#39;&amp;", "<>\"'&"],
			["Multiple&nbsp;&nbsp;&nbsp;spaces", "Multiple\u00A0\u00A0\u00A0spaces"],
		])("should decode '%p' to '%p'", (input, expected) => {
			expect(decodeHtmlEntities(input)).toBe(expected);
		});

		it("should handle malformed entities gracefully", () => {
			// Incomplete entities should remain unchanged
			expect(decodeHtmlEntities("&l incomplete")).toBe("&l incomplete");
			expect(decodeHtmlEntities("&#incomplete")).toBe("&#incomplete");
			expect(decodeHtmlEntities("&#x incomplete")).toBe("&#x incomplete");
		});

		it("should preserve text with no entities", () => {
			const plainText = "This is just plain text with no special characters.";
			expect(decodeHtmlEntities(plainText)).toBe(plainText);
		});

		it("should handle empty string", () => {
			expect(decodeHtmlEntities("")).toBe("");
		});
	});
});
