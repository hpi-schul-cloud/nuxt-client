import i18n from "./i18n";

describe("i18n plugin", () => {
	it("sets locale to the locale computed in the auth store module", () => {
		const mockContext = {
			app: {},
			store: {
				getters: {
					"auth/locale": "fi",
					"env-config/fallbackLanguage": "da",
				},
			},
		};

		i18n(mockContext);
		const vue18n = mockContext.app.i18n;

		expect(vue18n.locale).toBe("fi");
		expect(vue18n.fallbackLocale).toBe("da");
	});
});
