import { isValidLdapPath, isValidLdapUrl, isValidSecuredLdapUrl } from "./ldapValidators";

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

describe("util-validators/ldapValidators", () => {
	const error = "my error";

	describe("isValidLdapUrl", () => {
		const isValid = isValidLdapUrl(error);

		it("should accept URL with ldaps:// protocol and domain without port", () => {
			expect(isValid(ldapsURLDomainWithoutPort)).toBe(true);
		});

		it("should accept URL with ldaps:// protocol and domain with port", () => {
			expect(isValid(ldapsURLDomainWithPort)).toBe(true);
		});

		it("should accept URL with ldaps:// protocol and IPv4 without port", () => {
			expect(isValid(ldapsURLIPv4WithoutPort)).toBe(true);
		});

		it("should accept URL with ldaps:// protocol and IPv4 with port", () => {
			expect(isValid(ldapsURLIPv4WithPort)).toBe(true);
		});

		it("should accept URL with ldap:// protocol and domain without port", () => {
			expect(isValid(ldapURLDomainWithoutPort)).toBe(true);
		});

		it("should accept URL with ldap:// protocol and domain with port", () => {
			expect(isValid(ldapURLDomainWithPort)).toBe(true);
		});

		it("should accept URL with ldap:// protocol and IPv4 without port", () => {
			expect(isValid(ldapURLIPv4WithoutPort)).toBe(true);
		});

		it("should accept URL with ldap:// protocol and IPv4 with port", () => {
			expect(isValid(ldapURLIPv4WithPort)).toBe(true);
		});

		it("should reject URL with just an ldap:// protocol", () => {
			expect(isValid(ldapProtocol)).toBe(error);
		});

		it("should reject URL with just an ldaps:// protocol", () => {
			expect(isValid(ldapsProtocol)).toBe(error);
		});

		it("should reject URL with just a domain", () => {
			expect(isValid(randomDomain)).toBe(error);
		});

		it("should reject some random text", () => {
			expect(isValid(randomText)).toBe(error);
		});
	});

	describe("isValidSecuredLdapUrl", () => {
		const isValid = isValidSecuredLdapUrl(error);

		it("should accept URL with ldaps:// protocol and domain without port", () => {
			expect(isValid(ldapsURLDomainWithoutPort)).toBe(true);
		});

		it("should accept URL with ldaps:// protocol and domain with port", () => {
			expect(isValid(ldapsURLDomainWithPort)).toBe(true);
		});

		it("should accept URL with ldaps:// protocol and IPv4 without port", () => {
			expect(isValid(ldapsURLIPv4WithoutPort)).toBe(true);
		});

		it("should accept URL with ldaps:// protocol and IPv4 with port", () => {
			expect(isValid(ldapsURLIPv4WithPort)).toBe(true);
		});

		it("should reject URL with ldap:// protocol and domain without port", () => {
			expect(isValid(ldapURLDomainWithoutPort)).toBe(error);
		});

		it("should reject URL with ldap:// protocol and domain with port", () => {
			expect(isValid(ldapURLDomainWithPort)).toBe(error);
		});

		it("should reject URL with ldap:// protocol and IPv4 without port", () => {
			expect(isValid(ldapURLIPv4WithoutPort)).toBe(error);
		});

		it("should reject URL with ldap:// protocol and IPv4 with port", () => {
			expect(isValid(ldapURLIPv4WithPort)).toBe(error);
		});

		it("should reject URL with just an ldaps:// protocol", () => {
			expect(isValid(ldapsProtocol)).toBe(error);
		});

		it("should reject URL with just an ldap:// protocol", () => {
			expect(isValid(ldapProtocol)).toBe(error);
		});

		it("should reject URL with just a domain", () => {
			expect(isValid(randomDomain)).toBe(error);
		});

		it("should reject some random text", () => {
			expect(isValid(randomText)).toBe(error);
		});
	});

	describe("isValidLdapPath", () => {
		const isValid = isValidLdapPath(error);

		it("should accept simple LDAP path", () => {
			expect(isValid("ou=groups")).toBe(true);
		});

		it("should accept typical LDAP path", () => {
			expect(isValid("o=school0,dc=de,dc=example,dc=org")).toBe(true);
		});

		it("should reject some random domain", () => {
			expect(isValid(randomDomain)).toBe(error);
		});

		it("should reject some random text", () => {
			expect(isValid(randomText)).toBe(error);
		});
	});
});
