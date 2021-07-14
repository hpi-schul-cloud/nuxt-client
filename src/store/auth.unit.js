import { getters } from "./auth";

jest.useFakeTimers();
describe("store/auth", () => {
	let consoleErrorSpy;
	beforeEach(() => {
		consoleErrorSpy = jest.spyOn(console, "error").mockImplementation();
	});
	afterEach(() => {
		consoleErrorSpy.mockRestore();
	});

	describe("actions", () => {
		// TODO
	});

	describe("mutations", () => {
		// TODO
	});

	describe("getters", () => {
		describe("local", () => {
			it("returns the user's language", () => {
				const mockState = {
					locale: "ko",
				};
				const mockRootState = {
					auth: {
						locale: "ko",
					},
					"env-config": {
						env: {},
					},
				};

				const locale = getters.getLocale(mockState, {}, mockRootState);
				expect(locale).toBe("ko");
			});

			it("returns the school's language", () => {
				const mockState = {
					school: {
						language: "fi",
					},
				};
				const mockRootState = {
					auth: {},
					schools: {
						school: {
							language: "fi",
						},
					},
					"env-config": {
						env: {},
					},
				};

				const locale = getters.getLocale(mockState, {}, mockRootState);
				expect(locale).toBe("fi");
			});

			it("returns the instance language", () => {
				const mockState = {};
				const mockRootState = {
					auth: {},
					schools: {
						school: {},
					},
					"env-config": {
						env: { I18N__DEFAULT_LANGUAGE: "da" },
					},
				};

				const locale = getters.getLocale(mockState, {}, mockRootState);
				expect(locale).toBe("da");
			});

			it("returns the default language", () => {
				const mockState = {};
				const mockRootState = {
					auth: {},
					schools: {
						school: {},
					},
					"env-config": {
						env: {},
					},
				};

				const locale = getters.getLocale(mockState, {}, mockRootState);
				expect(locale).toBe("de");
			});
		});
	});
});
