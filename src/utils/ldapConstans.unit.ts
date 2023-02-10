import {
	ldapPathRegexValidator,
	ldapSecuredURLRegex,
	ldapURLRegex,
} from "./ldapConstants";

describe("ldapConstant", () => {
	describe("ldapSecuredURLRegex", () => {
		it("should validate domain without port", () => {
			expect(ldapSecuredURLRegex.test("ldaps://asdf.de")).toBe(true);
		});
		it("should validate domain with port", () => {
			expect(ldapSecuredURLRegex.test("ldaps://asdf.de:123")).toBe(true);
		});
		it("should validate ipv4 with port", () => {
			expect(ldapSecuredURLRegex.test("ldaps://127.0.0.1:123")).toBe(true);
		});
		it("should validate ipv4 without port", () => {
			expect(ldapSecuredURLRegex.test("ldaps://127.0.0.1")).toBe(true);
		});
		it("should fail domain with unsecure protocol", () => {
			expect(ldapSecuredURLRegex.test("ldap://asdf.de")).toBe(false);
		});
		it("should fail ipv4 with unsecure protocol", () => {
			expect(ldapSecuredURLRegex.test("ldap://127.0.0.1")).toBe(false);
		});
	});
	describe("ldapURLRegex", () => {
		it("should validate domain without port", () => {
			expect(ldapURLRegex.test("ldaps://asdf.de")).toBe(true);
		});
		it("should validate domain with port", () => {
			expect(ldapURLRegex.test("ldaps://asdf.de:123")).toBe(true);
		});
		it("should validate ipv4 with port", () => {
			expect(ldapURLRegex.test("ldaps://127.0.0.1:123")).toBe(true);
		});
		it("should validate ipv4 without port", () => {
			expect(ldapURLRegex.test("ldaps://127.0.0.1")).toBe(true);
		});
		it("should validate domain with unsecure protocol", () => {
			expect(ldapURLRegex.test("ldap://asdf.de")).toBe(true);
		});
		it("should validate ipv4 with unsecure protocol", () => {
			expect(ldapURLRegex.test("ldap://127.0.0.1")).toBe(true);
		});
	});

	describe("ldapPathRegexValidator", () => {
		it("should validate ldap path", () => {
			const temp = ldapPathRegexValidator;
			expect(temp("ou=groups")).toBe(true);
			expect(temp("o=school0,dc=de,dc=example,dc=org")).toBe(true);
		});
		it("should fail domain", () => {
			expect(ldapPathRegexValidator("asdf.asdf")).toBe(false);
		});
		it("should fail text only", () => {
			expect(ldapPathRegexValidator("asdf")).toBe(false);
		});
	});
});
