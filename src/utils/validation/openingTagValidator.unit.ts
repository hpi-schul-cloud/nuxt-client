import { containsOpeningTagFollowedByString, useOpeningTagValidator } from "@/utils/validation/openingTagValidator";
import { mountComposable } from "@@/tests/test-utils";
import { createTestingI18n } from "@@/tests/test-utils/setup";

describe("OpeningTagValidator", () => {
	describe("containsOpeningTagFollowedByString", () => {
		it("should return true when < is followed directly by a string", () => {
			expect(containsOpeningTagFollowedByString("Hello <world")).toBe(true);
		});

		it("should return true when < is followed directly by a string without spaces", () => {
			expect(containsOpeningTagFollowedByString("<abc123")).toBe(true);
		});

		it("should return true when < is followed by a single character", () => {
			expect(containsOpeningTagFollowedByString("<a")).toBe(true);
		});

		it("should return true when < is followed by multiple non-whitespace characters", () => {
			expect(containsOpeningTagFollowedByString("<multipleNonWhitespaceChars")).toBe(true);
		});

		it("should return true when < is followed by a string with special characters", () => {
			expect(containsOpeningTagFollowedByString("<!@#$%^&*()")).toBe(true);
		});

		it("should return true when < is followed by a string with numbers", () => {
			expect(containsOpeningTagFollowedByString("<12345")).toBe(true);
		});

		it("should return true when < is followed by a string with mixed characters", () => {
			expect(containsOpeningTagFollowedByString("<abc123!@#")).toBe(true);
		});

		it("should return false when < followed by a < with a string", () => {
			expect(containsOpeningTagFollowedByString("< <asd ")).toBe(true);
		});

		it("should return true when string contains two < followed by a string", () => {
			expect(containsOpeningTagFollowedByString("<asd <asd")).toBe(true);
		});

		it("should return false when < is followed by a <", () => {
			expect(containsOpeningTagFollowedByString("<<")).toBe(false);
		});

		it("should return false when < is followed by a <", () => {
			expect(containsOpeningTagFollowedByString("< <")).toBe(false);
		});

		it("should return false when < is followed by a space", () => {
			expect(containsOpeningTagFollowedByString("Hello < world")).toBe(false);
		});

		it("should return false when there is no < in the string", () => {
			expect(containsOpeningTagFollowedByString("No special character here")).toBe(false);
		});

		it("should return false when < is followed by only spaces", () => {
			expect(containsOpeningTagFollowedByString("<   ")).toBe(false);
		});

		it("should return false when < is the last character in the string", () => {
			expect(containsOpeningTagFollowedByString("Just a <")).toBe(false);
		});

		it("should return false when < is followed by a newline character", () => {
			expect(containsOpeningTagFollowedByString("<\n")).toBe(false);
		});

		it("should return false when < is followed by a tab character", () => {
			expect(containsOpeningTagFollowedByString("<\t")).toBe(false);
		});

		it("should return false when the string is empty", () => {
			expect(containsOpeningTagFollowedByString("")).toBe(false);
		});

		it("should return false when the string contains only whitespace", () => {
			expect(containsOpeningTagFollowedByString("   ")).toBe(false);
		});
	});

	describe("validateOnOpeningTag", () => {
		const setup = () => {
			const { validateOnOpeningTag } = mountComposable(useOpeningTagValidator, {
				global: {
					plugins: [createTestingI18n()],
				},
			});

			return { validateOnOpeningTag };
		};

		describe("when the string contains < followed by a string", () => {
			it("should return error message when < is followed directly by a string", () => {
				const { validateOnOpeningTag } = setup();

				expect(validateOnOpeningTag("Hello <world")).toBe("common.validation.containsOpeningTag");
			});
		});

		describe("when the string does not contain < followed by a string", () => {
			it("should return true when the string does not contain < followed by a string", () => {
				const { validateOnOpeningTag } = setup();

				expect(validateOnOpeningTag("No special character here")).toBe(true);
			});
		});
	});
});
