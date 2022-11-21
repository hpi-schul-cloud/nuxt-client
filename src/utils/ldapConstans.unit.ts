import {
	ldapPathRegexValidatior,
	urlRegex,
	urlRegexDevStage,
} from "./ldapConstants";

describe("ldapConstant", () => {
	describe("urlRegex", () => {
		it("should validate domain without port", () => {
			expect(urlRegex.test("ldaps://asdf.de")).toBe(true);
		});
		it("should validate domain with port", () => {
			expect(urlRegex.test("ldaps://asdf.de:123")).toBe(true);
		});
		it("should validate ipv4 with port", () => {
			expect(urlRegex.test("ldaps://127.0.0.1:123")).toBe(true);
		});
		it("should validate ipv4 without port", () => {
			expect(urlRegex.test("ldaps://127.0.0.1")).toBe(true);
		});
		it("should fail domain with unsecure protocol", () => {
			expect(urlRegex.test("ldap://asdf.de")).toBe(false);
		});
		it("should fail ipv4 with unsecure protocol", () => {
			expect(urlRegex.test("ldap://127.0.0.1")).toBe(false);
		});
	});
	describe("urlRegex", () => {
		it("should validate domain without port", () => {
			expect(urlRegexDevStage.test("ldaps://asdf.de")).toBe(true);
		});
		it("should validate domain with port", () => {
			expect(urlRegexDevStage.test("ldaps://asdf.de:123")).toBe(true);
		});
		it("should validate ipv4 with port", () => {
			expect(urlRegexDevStage.test("ldaps://127.0.0.1:123")).toBe(true);
		});
		it("should validate ipv4 without port", () => {
			expect(urlRegexDevStage.test("ldaps://127.0.0.1")).toBe(true);
		});
		it("should validate domain with unsecure protocol", () => {
			expect(urlRegexDevStage.test("ldap://asdf.de")).toBe(true);
		});
		it("should validate ipv4 with unsecure protocol", () => {
			expect(urlRegexDevStage.test("ldap://127.0.0.1")).toBe(true);
		});
	});

	describe("ldapPathRegexValidatior", () => {
		it("should validate ldap path", () => {
			const temp = ldapPathRegexValidatior;
			expect(temp("ou=groups")).toBe(true);
			expect(temp("o=school0,dc=de,dc=example,dc=org")).toBe(true);
		});
		it("should fail domain", () => {
			expect(ldapPathRegexValidatior("asdf.asdf")).toBe(false);
		});
		it("should fail text only", () => {
			expect(ldapPathRegexValidatior("asdf")).toBe(false);
		});
	});
});
