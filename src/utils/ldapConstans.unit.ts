import { ldapPathRegexValidator, ldapSecuredURLRegexValidator, ldapURLRegexValidator } from "./ldapConstants";

const ldapURLDomainWithPort = "ldap://asdf.de:123";
const ldapURLDomainWithoutPort = "ldap://asdf.de";
const ldapURLIPv4WithPort = "ldap://127.0.0.1:123";
const ldapURLIPv4WithoutPort = "ldap://127.0.0.1";
const ldapsURLDomainWithPort = "ldaps://asdf.de:123";
const ldapsURLDomainWithoutPort = "ldaps://asdf.de";
const ldapsURLIPv4WithPort = "ldaps://127.0.0.1:123";
const ldapsURLIPv4WithoutPort = "ldaps://127.0.0.1";
const ldapProtocol = "ldap://";
const ldapsProtocol = "ldaps://";
const randomDomain = "example.com";
const randomText = "asdf";

describe("ldapConstant", () => {
	describe("ldapPathRegexValidator", () => {
		it("should accept simple LDAP path", () => {
			expect(ldapPathRegexValidator("ou=groups")).toBe(true);
		});

		it("should accept typical LDAP path", () => {
			expect(ldapPathRegexValidator("o=school0,dc=de,dc=example,dc=org")).toBe(true);
		});

		it("should reject some random domain", () => {
			expect(ldapPathRegexValidator(randomDomain)).toBe(false);
		});

		it("should reject some random text", () => {
			expect(ldapPathRegexValidator(randomText)).toBe(false);
		});
	});

	describe("ldapURLRegexValidator", () => {
		it("should accept URL with ldaps:// protocol and domain without port", () => {
			expect(ldapURLRegexValidator(ldapsURLDomainWithoutPort)).toBe(true);
		});

		it("should accept URL with ldaps:// protocol and domain with port", () => {
			expect(ldapURLRegexValidator(ldapsURLDomainWithPort)).toBe(true);
		});

		it("should accept URL with ldaps:// protocol and IPv4 without port", () => {
			expect(ldapURLRegexValidator(ldapsURLIPv4WithoutPort)).toBe(true);
		});

		it("should accept URL with ldaps:// protocol and IPv4 with port", () => {
			expect(ldapURLRegexValidator(ldapsURLIPv4WithPort)).toBe(true);
		});

		it("should accept URL with ldap:// protocol and domain without port", () => {
			expect(ldapURLRegexValidator(ldapURLDomainWithoutPort)).toBe(true);
		});

		it("should accept URL with ldap:// protocol and domain with port", () => {
			expect(ldapURLRegexValidator(ldapURLDomainWithPort)).toBe(true);
		});

		it("should accept URL with ldap:// protocol and IPv4 without port", () => {
			expect(ldapURLRegexValidator(ldapURLIPv4WithoutPort)).toBe(true);
		});

		it("should accept URL with ldap:// protocol and IPv4 with port", () => {
			expect(ldapURLRegexValidator(ldapURLIPv4WithPort)).toBe(true);
		});

		it("should reject URL with just an ldap:// protocol", () => {
			expect(ldapURLRegexValidator(ldapProtocol)).toBe(false);
		});

		it("should reject URL with just an ldaps:// protocol", () => {
			expect(ldapURLRegexValidator(ldapsProtocol)).toBe(false);
		});

		it("should reject URL with just a domain", () => {
			expect(ldapURLRegexValidator(randomDomain)).toBe(false);
		});

		it("should reject some random text", () => {
			expect(ldapURLRegexValidator(randomText)).toBe(false);
		});
	});

	describe("ldapSecuredURLRegexValidator", () => {
		it("should accept URL with ldaps:// protocol and domain without port", () => {
			expect(ldapSecuredURLRegexValidator(ldapsURLDomainWithoutPort)).toBe(true);
		});

		it("should accept URL with ldaps:// protocol and domain with port", () => {
			expect(ldapSecuredURLRegexValidator(ldapsURLDomainWithPort)).toBe(true);
		});

		it("should accept URL with ldaps:// protocol and IPv4 without port", () => {
			expect(ldapSecuredURLRegexValidator(ldapsURLIPv4WithoutPort)).toBe(true);
		});

		it("should accept URL with ldaps:// protocol and IPv4 with port", () => {
			expect(ldapSecuredURLRegexValidator(ldapsURLIPv4WithPort)).toBe(true);
		});

		it("should reject URL with ldap:// protocol and domain without port", () => {
			expect(ldapSecuredURLRegexValidator(ldapURLDomainWithoutPort)).toBe(false);
		});

		it("should reject URL with ldap:// protocol and domain with port", () => {
			expect(ldapSecuredURLRegexValidator(ldapURLDomainWithPort)).toBe(false);
		});

		it("should reject URL with ldap:// protocol and IPv4 without port", () => {
			expect(ldapSecuredURLRegexValidator(ldapURLIPv4WithoutPort)).toBe(false);
		});

		it("should reject URL with ldap:// protocol and IPv4 with port", () => {
			expect(ldapSecuredURLRegexValidator(ldapURLIPv4WithPort)).toBe(false);
		});

		it("should reject URL with just an ldaps:// protocol", () => {
			expect(ldapSecuredURLRegexValidator(ldapsProtocol)).toBe(false);
		});

		it("should reject URL with just an ldap:// protocol", () => {
			expect(ldapSecuredURLRegexValidator(ldapProtocol)).toBe(false);
		});

		it("should reject URL with just a domain", () => {
			expect(ldapSecuredURLRegexValidator(randomDomain)).toBe(false);
		});

		it("should reject some random text", () => {
			expect(ldapSecuredURLRegexValidator(randomText)).toBe(false);
		});
	});
});
