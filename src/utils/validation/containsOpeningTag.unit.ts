import { containsOpeningTagFollowedByString } from "./containsOpeningTag";

describe("containsOpeningTagFollowedByString", () => {
	describe("when < is followed directly by a string", () => {
		it("should return true", () => {
			expect(containsOpeningTagFollowedByString("Hello <world")).toBe(true);
		});
	});

	describe("when < is followed directly by a string without spaces", () => {
		it("should return true", () => {
			expect(containsOpeningTagFollowedByString("<abc123")).toBe(true);
		});
	});

	describe("when < is followed by a single character", () => {
		it("should return true", () => {
			expect(containsOpeningTagFollowedByString("<a")).toBe(true);
		});
	});

	describe("when < is followed by multiple non-whitespace characters", () => {
		it("should return true", () => {
			expect(
				containsOpeningTagFollowedByString("<multipleNonWhitespaceChars")
			).toBe(true);
		});
	});

	describe("when < is followed by a string with special characters", () => {
		it("should return true", () => {
			expect(containsOpeningTagFollowedByString("<!@#$%^&*()")).toBe(true);
		});
	});

	describe("when < is followed by a string with numbers", () => {
		it("should return true", () => {
			expect(containsOpeningTagFollowedByString("<12345")).toBe(true);
		});
	});

	describe("when < is followed by a string with mixed characters", () => {
		it("should return true", () => {
			expect(containsOpeningTagFollowedByString("<abc123!@#")).toBe(true);
		});
	});

	describe("when < is followed by a <", () => {
		it("should return true", () => {
			expect(containsOpeningTagFollowedByString("<<")).toBe(true);
		});
	});

	describe("when < is followed by a space", () => {
		it("should return false", () => {
			expect(containsOpeningTagFollowedByString("Hello < world")).toBe(false);
		});
	});

	describe("when there is no < in the string", () => {
		it("should return false", () => {
			expect(
				containsOpeningTagFollowedByString("No special character here")
			).toBe(false);
		});
	});

	describe("when < is followed by only spaces", () => {
		it("should return false", () => {
			expect(containsOpeningTagFollowedByString("<   ")).toBe(false);
		});
	});

	describe("when < is the last character in the string", () => {
		it("should return false", () => {
			expect(containsOpeningTagFollowedByString("Just a <")).toBe(false);
		});
	});

	describe("when < is followed by a newline character", () => {
		it("should return false", () => {
			expect(containsOpeningTagFollowedByString("<\n")).toBe(false);
		});
	});

	describe("when < is followed by a tab character", () => {
		it("should return false", () => {
			expect(containsOpeningTagFollowedByString("<\t")).toBe(false);
		});
	});

	describe("when the string is empty", () => {
		it("should return false", () => {
			expect(containsOpeningTagFollowedByString("")).toBe(false);
		});
	});

	describe("when the string contains only whitespace", () => {
		it("should return false", () => {
			expect(containsOpeningTagFollowedByString("   ")).toBe(false);
		});
	});
});
