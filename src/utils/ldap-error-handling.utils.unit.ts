import { LdapError, ldapErrorHandler } from "./ldap-error-handling.utils";

describe("ldapErrorHandler", () => {
	const t = (key: string) => key;

	it.each<{ error: LdapError; expected: string }>([
		{
			error: { type: "WRONG_CREDENTIALS" },
			expected: "pages.administration.ldap.errors.credentials",
		},
		{
			error: { type: "CONNECTION_ERROR", message: "connection refused" },
			expected: "connection refused",
		},
		{
			error: { type: "WRONG_SEARCH_PATH" },
			expected: "pages.administration.ldap.errors.path",
		},
		{
			error: { type: "INVALID_CONFIGURATION_OBJECT" },
			expected: "pages.administration.ldap.errors.configuration",
		},
	])("should return correct message for $error.type", ({ error, expected }) => {
		const result = ldapErrorHandler([error], t);

		expect(result).toEqual([expected]);
	});

	it("should skip CONNECTION_ERROR when message is missing", () => {
		const result = ldapErrorHandler([{ type: "CONNECTION_ERROR" }], t);

		expect(result).toEqual([]);
	});

	it("should ignore unknown error types", () => {
		const result = ldapErrorHandler([{ type: "UNKNOWN" }], t);

		expect(result).toEqual([]);
	});

	it("should return empty array for undefined input", () => {
		const result = ldapErrorHandler(undefined, t);

		expect(result).toEqual([]);
	});

	it("should handle multiple errors", () => {
		const errors: LdapError[] = [{ type: "WRONG_CREDENTIALS" }, { type: "WRONG_SEARCH_PATH" }];

		const result = ldapErrorHandler(errors, t);

		expect(result).toEqual(["pages.administration.ldap.errors.credentials", "pages.administration.ldap.errors.path"]);
	});
});
