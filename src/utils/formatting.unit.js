import { upperCaseFirstChar, toKebabCase } from "./formatting";

describe("@/utils/formatting", () => {
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
});
