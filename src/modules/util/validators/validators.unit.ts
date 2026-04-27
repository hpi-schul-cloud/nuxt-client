import { createTestingPinia } from "@pinia/testing";
import {
	hasLowercaseLetter,
	hasNumber,
	hasSpecialCharacter,
	hasUppercaseLetter,
	isNonEmptyString,
	isOfMaxLength,
	isOfMinLength,
	isRequired,
	isValidDate,
	isValidEmail,
	isValidTime,
	isValidUrl,
} from "@util-validators";
import { setActivePinia } from "pinia";

describe("util-validators", () => {
	const ERROR = "my error";

	beforeAll(() => {
		setActivePinia(createTestingPinia());
	});

	describe("isRequired", () => {
		it("should not accept empty value", () => {
			const isValid = isRequired(ERROR);
			expect(isValid("")).toBe(ERROR);
			expect(isValid(undefined)).toBe(ERROR);
			expect(isValid(null)).toBe(ERROR);
		});

		it("should accept non empty values", () => {
			const isValid = isRequired(ERROR);
			expect(isValid("A")).toBe(true);
			expect(isValid(1)).toBe(true);
		});
	});

	describe("isOfMaxLength", () => {
		it("should not accept string of more length than parameter given", () => {
			const maxLength = 5;
			const tooLongValue = "123456";
			const isValid = isOfMaxLength(maxLength)(ERROR);
			expect(isValid(tooLongValue)).toBe(ERROR);
		});

		it("should accept values of null or undefined", () => {
			const maxLength = 5;
			const isValid = isOfMaxLength(maxLength)(ERROR);
			expect(isValid(null)).toBe(true);
			expect(isValid(undefined)).toBe(true);
		});
	});

	describe("isNonEmptyString", () => {
		it("should not accept empty string", () => {
			const isValid = isNonEmptyString(ERROR);
			expect(isValid("")).toBe(ERROR);
		});

		it("should not accept only whitespaces", () => {
			const isValid = isNonEmptyString(ERROR);
			expect(isValid("   ")).toBe(ERROR);
		});

		it("should not accept null or undefined", () => {
			const isValid = isNonEmptyString(ERROR);
			expect(isValid(null)).toBe(ERROR);
			expect(isValid(undefined)).toBe(ERROR);
		});
	});

	describe("isValidUrl", () => {
		const isValid = isValidUrl(ERROR);

		describe("when protocol is given", () => {
			it("should accept true urls with http-protocol", () => {
				expect(isValid("http://medium.com/how-to-write-great-tests")).toBe(true);
			});

			it("should accept urls with https-protocol", () => {
				expect(isValid("https://medium.com/my-article")).toBe(true);
			});

			it("should return ERROR when urls with other protocols than http and https", () => {
				expect(isValid("ftp://medium.com/my-article")).toBe(ERROR);
			});
		});

		describe("when protocol is missing", () => {
			it("should accept urls with hostname containing a dot", () => {
				expect(isValid("medium.com/how-to-write-great-tests")).toBe(true);
			});

			it("should return ERROR when url's hostname does not contain a dot", () => {
				expect(isValid("medium-com/how-to-write-great-tests")).toBe(ERROR);
			});
		});

		describe("when hostname has empty labels", () => {
			it("should return ERROR for leading dot (.com)", () => {
				expect(isValid(".com")).toBe(ERROR);
				expect(isValid("https://.com/")).toBe(ERROR);
			});

			it("should return ERROR for trailing dot (foo.)", () => {
				expect(isValid("foo.")).toBe(ERROR);
			});

			it("should return ERROR for consecutive dots (foo..bar)", () => {
				expect(isValid("foo..bar.com")).toBe(ERROR);
			});
		});

		describe("when hostname has labels with invalid hyphens", () => {
			it("should return ERROR for leading hyphen (-medium.com)", () => {
				expect(isValid("-medium.com")).toBe(ERROR);
				expect(isValid("https://-medium.com/test")).toBe(ERROR);
			});

			it("should return ERROR for trailing hyphen (medium.com-)", () => {
				expect(isValid("medium.com-/test")).toBe(ERROR);
				expect(isValid("https://medium.com-/")).toBe(ERROR);
			});
		});

		describe("when url is IPv4", () => {
			it("should return ERROR for IPv4 addresses", () => {
				expect(isValid("192.168.1.1")).toBe(ERROR);
				expect(isValid("https://192.168.1.1/")).toBe(ERROR);
				expect(isValid("127.0.0.1")).toBe(ERROR);
			});
		});

		describe("when url has label length issues", () => {
			it("should return ERROR when label exceeds 63 characters", () => {
				const tooLongLabel = "a".repeat(64);
				expect(isValid(`https://${tooLongLabel}.com/`)).toBe(ERROR);
			});

			it("should accept label with exactly 63 characters", () => {
				const maxLabel = "a".repeat(63);
				expect(isValid(`https://${maxLabel}.com/`)).toBe(true);
			});
		});

		describe("when url has hostname length issues", () => {
			it("should return ERROR when hostname exceeds 253 characters", () => {
				const tooLongHostname = "a".repeat(250) + ".com";
				expect(isValid(`https://${tooLongHostname}/`)).toBe(ERROR);
			});
		});

		describe("when url is a valid IDN (internationalized domain name)", () => {
			test.each(["xn--huser-gra.tld", "xn--grsse-lva.tld", "xn--5eyx16c.tld"])(
				"should accept valid punycode domain %s",
				(url) => {
					expect(isValid(url)).toBe(true);
				}
			);
		});

		describe("when url has special characters", () => {
			it("should return ERROR for spaces in hostname", () => {
				expect(isValid("abc die katze liegt im schnee")).toBe(ERROR);
			});
		});

		describe("when url is localhost", () => {
			it("should accept localhost without TLD", () => {
				expect(isValid("localhost")).toBe(true);
				expect(isValid("http://localhost:3000")).toBe(true);
			});
		});

		describe("when url has whitespace", () => {
			it("should accept url with leading/trailing whitespace", () => {
				expect(isValid("  https://medium.com/  ")).toBe(true);
			});
		});
	});

	describe("isValidTime", () => {
		it("should accept valid time format", () => {
			expect(isValidTime("12:12")).toBe(true);
		});

		it("should not accept invalid time format", () => {
			expect(isValidTime("55:55")).not.toBe(true);
			expect(typeof isValidTime("55:55")).toBe("string");
			expect(isValidTime("55:5")).not.toBe(true);
			expect(typeof isValidTime("55:5")).toBe("string");
		});
	});

	describe("isValidDateFormat", () => {
		it("should accept valid date format", () => {
			expect(isValidDate("12.12.2023")).toBe(true);
		});

		it("should not accept invalid date format", () => {
			expect(isValidDate("31.31.2023")).not.toBe(true);
			expect(typeof isValidDate("31.31.2023")).toBe("string");

			expect(isValidDate("1.1.2001")).not.toBe(true);
			expect(typeof isValidDate("1.1.2001")).toBe("string");

			expect(isValidDate("1.101")).not.toBe(true);
			expect(typeof isValidDate("1.101")).toBe("string");
		});
	});

	describe("isOfMinLength", () => {
		it("should not accept string of less length than parameter given", () => {
			const minLength = 5;
			const tooShortValue = "1234";
			const isValid = isOfMinLength(minLength)(ERROR);
			expect(isValid(tooShortValue)).toBe(ERROR);
		});

		it("should accept values of null or undefined", () => {
			const minLength = 5;
			const isValid = isOfMinLength(minLength)(ERROR);
			expect(isValid(null)).toBe(true);
			expect(isValid(undefined)).toBe(true);
		});
	});

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

	describe("isValidEmail", () => {
		const isValid = isValidEmail(ERROR);

		it("should accept valid email address", () => {
			expect(isValid("test@example.com")).toBe(true);
		});

		it("should not accept invalid email address", () => {
			expect(isValid("test@.com")).toBe(ERROR);
			expect(isValid("testexample.com")).toBe(ERROR);
			expect(isValid("test@exam_ple.com")).toBe(ERROR);
		});
	});
});
