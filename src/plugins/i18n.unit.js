import i18n from "./i18n";

describe("i18n plugin", () => {
	it("sets locale to the locale computed in the auth store module", () => {
		const mockContext = {
			app: {},
			store: {
				getters: {
					"auth/locale": "fi",
				},
				state: {
					"env-config": {
						env: {
							I18N__FALLBACK_LANGUAGE: "da",
						},
					},
				},
			},
		};
		i18n(mockContext);
		const vue18n = mockContext.app.i18n;
		expect(vue18n.locale).toBe("fi");
	});
	it("sets fallback language to the configured fallback from the server", () => {
		const mockContext = {
			app: {},
			store: {
				getters: {
					locale: "fi",
				},
				state: {
					"env-config": {
						env: {
							I18N__FALLBACK_LANGUAGE: "da",
						},
					},
				},
			},
		};
		i18n(mockContext);
		const vue18n = mockContext.app.i18n;
		expect(vue18n.fallbackLocale).toBe("da");
	});
	it("sets fallback locale 'de' if not available in env config", () => {
		const mockContext = {
			app: {},
			store: {
				getters: {
					locale: "fi",
				},
				state: {},
			},
		};
		i18n(mockContext);
		const vue18n = mockContext.app.i18n;
		expect(vue18n.fallbackLocale).toBe("de");
	});
});
