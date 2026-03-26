import { mountComposable } from "@@/tests/test-utils";
import { createTestingI18n } from "@@/tests/test-utils/setup";
import { containsInvalidCharacters, useInvalidCharactersValidator } from "@util-validators";

describe("InvalidCharactersValidator", () => {
	describe("containsInvalidCharacters", () => {
		it("should return true when input contains a single invalid character", () => {
			expect(containsInvalidCharacters("test/file", ["/"])).toBe(true);
		});

		it("should return true when input contains multiple occurrences of invalid character", () => {
			expect(containsInvalidCharacters("test/file/name", ["/"])).toBe(true);
		});

		it("should return true when input contains one of multiple invalid characters", () => {
			expect(containsInvalidCharacters("test*file", ["/", "*", "\\"])).toBe(true);
		});

		it("should return true when input contains multiple invalid characters", () => {
			expect(containsInvalidCharacters("test/file*name", ["/", "*", "\\"])).toBe(true);
		});

		it("should return true when input contains invalid character at the beginning", () => {
			expect(containsInvalidCharacters("/testfile", ["/"])).toBe(true);
		});

		it("should return true when input contains invalid character at the end", () => {
			expect(containsInvalidCharacters("testfile/", ["/"])).toBe(true);
		});

		it("should return true when input contains only invalid character", () => {
			expect(containsInvalidCharacters("/", ["/"])).toBe(true);
		});

		it("should return false when input does not contain any invalid characters", () => {
			expect(containsInvalidCharacters("testfile", ["/"])).toBe(false);
		});

		it("should return false when input is empty", () => {
			expect(containsInvalidCharacters("", ["/"])).toBe(false);
		});

		it("should return false when invalid characters array is empty", () => {
			expect(containsInvalidCharacters("test/file", [])).toBe(false);
		});

		it("should return true when checking for special characters", () => {
			expect(containsInvalidCharacters("file<name", ["<", ">", ":", '"', "|", "?", "*"])).toBe(true);
		});
	});

	describe("validateInvalidCharacters", () => {
		const setup = () => {
			const { validateInvalidCharacters } = mountComposable(useInvalidCharactersValidator, {
				global: {
					plugins: [createTestingI18n()],
				},
			});

			return { validateInvalidCharacters };
		};

		describe("when the string contains invalid characters", () => {
			it("should return error message when input contains forward slash", () => {
				const { validateInvalidCharacters } = setup();

				expect(validateInvalidCharacters("test/file", ["/"])).toBe(
					"pages.folder.rename-file-dialog.validation.invalid-characters"
				);
			});
		});

		describe("when the string does not contain invalid characters", () => {
			it("should return true when input is valid", () => {
				const { validateInvalidCharacters } = setup();

				expect(validateInvalidCharacters("validfilename", ["/"])).toBe(true);
			});
		});
	});
});
