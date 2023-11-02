import { isValidUrl } from "@util-validators";

describe("util-validators", () => {
	describe("isValidUrl", () => {
		const ERROR = "my error";
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
			])("should return ERROR for %s", (url) => {
				expect(isValid(url)).toBe(ERROR);
			});
		});
	});
});
