import {
	isValidUrl,
	isRequired,
	isValidTimeFormat,
	isValidDateFormat,
	isOfMaxLength,
} from "@util-validators";

describe("util-validators", () => {
	const ERROR = "my error";

	describe("isRequired", () => {
		it("should not accept empty value", () => {
			const isValid = isRequired(ERROR);
			expect(isValid("")).toBe(ERROR);
		});
	});

	describe("isOfMaxLength", () => {
		it("should not accept values of more length then parameter given", () => {
			const maxLength = 5;
			const tooLongValue = "123456";
			const isValid = isOfMaxLength(maxLength)(ERROR);
			expect(isValid(tooLongValue)).toBe(ERROR);
		});
	});

	describe("isValidUrl", () => {
		const isValid = isValidUrl(ERROR);

		describe("when protocol is given", () => {
			it("should accept true urls with http-protocol", () => {
				expect(isValid("http://medium.com/how-to-write-great-tests")).toBe(
					true
				);
			});

			it("should accept urls with https-protocol", () => {
				expect(isValid("http://medium.com/my-article")).toBe(true);
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

		describe("when url is valid IDN (internationalized domain name)", () => {
			test.each([
				"xn--huser-gra.tld",
				"xn--grsse-lva.tld",
				"xn--5eyx16c.tld",
				"xn--90aqfi­dwgh3ei­.tld",
			])("should return ERROR for %s", (url) => {
				expect(isValid(url)).toBe(ERROR);
			});
		});

		describe("when url is invalid IDN (internationalized domain name)", () => {
			test.each([
				"-medium.com/how-to-write-test",
				"me--dium.com/how-to--write-test",
				"medium.com-/how-to--write-test",
				"abc die katze liegt im schnee",
			])("should return ERROR for %s", (url) => {
				expect(isValid(url)).toBe(ERROR);
			});
		});
	});

	describe("isValidTimeFormat", () => {
		it("should accept valid time format", () => {
			expect(isValidTimeFormat("12:12")).toBe(true);
		});

		it("should not accept invalid time format", () => {
			expect(isValidTimeFormat("55:5")).toBe(false);
			expect(isValidTimeFormat("55:55")).toBe(false);
		});
	});

	describe("isValidDateFormat", () => {
		it("should accept valid date format", () => {
			expect(isValidDateFormat("12.12.2023")).toBe(true);
		});

		it("should not accept invalid date format", () => {
			expect(isValidDateFormat("31.31.2023")).toBe(false);
			expect(isValidDateFormat("1.1.2001")).toBe(false);
			expect(isValidDateFormat("1.101")).toBe(false);
		});
	});
});
