import { hasLowercaseLetter, hasNumber, hasSpecialCharacter, hasUppercaseLetter } from "@util-validators";

describe("util-validators/passwordValidators", () => {
	const ERROR = "my error";

	describe("hasUppercaseLetter", () => {
		it("should accept string with at least one uppercase letter", () => {
			const isValid = hasUppercaseLetter(ERROR);
			expect(isValid("Abcdef")).toBe(true);
		});

		it("should not accept string without uppercase letter", () => {
			const isValid = hasUppercaseLetter(ERROR);
			expect(isValid("abcdef")).toBe(ERROR);
		});
	});

	describe("hasLowercaseLetter", () => {
		it("should accept string with at least one lowercase letter", () => {
			const isValid = hasLowercaseLetter(ERROR);
			expect(isValid("Abcdef")).toBe(true);
		});

		it("should not accept string without lowercase letter", () => {
			const isValid = hasLowercaseLetter(ERROR);
			expect(isValid("ABCDEF")).toBe(ERROR);
		});
	});

	describe("hasNumber", () => {
		it("should accept string with at least one number", () => {
			const isValid = hasNumber(ERROR);
			expect(isValid("Abcdef1")).toBe(true);
		});

		it("should not accept string without number", () => {
			const isValid = hasNumber(ERROR);
			expect(isValid("ABCDEF")).toBe(ERROR);
		});
	});

	describe("hasSpecialCharacter", () => {
		const specialChars = "!§$%&/()=?\\;:,.#+*~-".split("");

		it.each(specialChars)("should accept string with at least one special character", (specialChar) => {
			const isValid = hasSpecialCharacter(ERROR);
			expect(isValid(`Abcdef${specialChar}`)).toBe(true);
		});

		it("should not accept string without special character", () => {
			const isValid = hasSpecialCharacter(ERROR);
			expect(isValid("ABCDEF")).toBe(ERROR);
		});

		it("should not accept special characters that are not allowed", () => {
			const isValid = hasSpecialCharacter(ERROR);
			expect(isValid("Abcdef€")).toBe(ERROR);
		});
	});
});
