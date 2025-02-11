import { OpeningTagValidator } from "./openingTagValidator";

describe("OpeningTagValidator", () => {
	describe("containsOpeningTagFollowedByString", () => {
		it("should return true when < is followed directly by a string", () => {
			expect(
				OpeningTagValidator.containsOpeningTagFollowedByString("Hello <world")
			).toBe(true);
		});

		it("should return true when < is followed directly by a string without spaces", () => {
			expect(
				OpeningTagValidator.containsOpeningTagFollowedByString("<abc123")
			).toBe(true);
		});

		it("should return true when < is followed by a single character", () => {
			expect(OpeningTagValidator.containsOpeningTagFollowedByString("<a")).toBe(
				true
			);
		});

		it("should return true when < is followed by multiple non-whitespace characters", () => {
			expect(
				OpeningTagValidator.containsOpeningTagFollowedByString(
					"<multipleNonWhitespaceChars"
				)
			).toBe(true);
		});

		it("should return true when < is followed by a string with special characters", () => {
			expect(
				OpeningTagValidator.containsOpeningTagFollowedByString("<!@#$%^&*()")
			).toBe(true);
		});

		it("should return true when < is followed by a string with numbers", () => {
			expect(
				OpeningTagValidator.containsOpeningTagFollowedByString("<12345")
			).toBe(true);
		});

		it("should return true when < is followed by a string with mixed characters", () => {
			expect(
				OpeningTagValidator.containsOpeningTagFollowedByString("<abc123!@#")
			).toBe(true);
		});

		it("should return false when < followed by a < with a string", () => {
			expect(
				OpeningTagValidator.containsOpeningTagFollowedByString("< <asd ")
			).toBe(true);
		});

		it("should return true when string contains two < followed by a string", () => {
			expect(
				OpeningTagValidator.containsOpeningTagFollowedByString("<asd <asd")
			).toBe(true);
		});

		it("should return false when < is followed by a <", () => {
			expect(OpeningTagValidator.containsOpeningTagFollowedByString("<<")).toBe(
				false
			);
		});

		it("should return false when < is followed by a <", () => {
			expect(
				OpeningTagValidator.containsOpeningTagFollowedByString("< <")
			).toBe(false);
		});

		it("should return false when < is followed by a space", () => {
			expect(
				OpeningTagValidator.containsOpeningTagFollowedByString("Hello < world")
			).toBe(false);
		});

		it("should return false when there is no < in the string", () => {
			expect(
				OpeningTagValidator.containsOpeningTagFollowedByString(
					"No special character here"
				)
			).toBe(false);
		});

		it("should return false when < is followed by only spaces", () => {
			expect(
				OpeningTagValidator.containsOpeningTagFollowedByString("<   ")
			).toBe(false);
		});

		it("should return false when < is the last character in the string", () => {
			expect(
				OpeningTagValidator.containsOpeningTagFollowedByString("Just a <")
			).toBe(false);
		});

		it("should return false when < is followed by a newline character", () => {
			expect(
				OpeningTagValidator.containsOpeningTagFollowedByString("<\n")
			).toBe(false);
		});

		it("should return false when < is followed by a tab character", () => {
			expect(
				OpeningTagValidator.containsOpeningTagFollowedByString("<\t")
			).toBe(false);
		});

		it("should return false when the string is empty", () => {
			expect(OpeningTagValidator.containsOpeningTagFollowedByString("")).toBe(
				false
			);
		});

		it("should return false when the string contains only whitespace", () => {
			expect(
				OpeningTagValidator.containsOpeningTagFollowedByString("   ")
			).toBe(false);
		});
	});

	describe("getValidationMessage", () => {
		describe("when the string contains < followed by a string", () => {
			it("should return error message when < is followed directly by a string", () => {
				expect(
					OpeningTagValidator.getValidationMessage("Hello <world", (key) => key)
				).toBe("common.validation.containsOpeningTag");
			});
		});

		describe("when the string does not contain < followed by a string", () => {
			it("should return true when the string does not contain < followed by a string", () => {
				expect(
					OpeningTagValidator.getValidationMessage(
						"No special character here",
						(key) => key
					)
				).toBe(true);
			});
		});
	});
});
