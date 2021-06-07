import i18n from "./i18n";

describe("i18n plugin", () => {
	it("sets locale to user's language if env config is available", () => {
		const mockContext = {
			app: {},
			store: {
				state: {
					auth: {
						locale: "fi",
					},
					"env-config": {
						env: {
							I18N__DEFAULT_LANGUAGE: "ko",
							I18N__FALLBACK_LANGUAGE: "da",
						},
					},
				},
			},
		};
		i18n(mockContext);
		const vue18n = mockContext.app.i18n;
		expect(vue18n.locale).toBe("fi");
		expect(vue18n.fallbackLocale).toBe("da");
	});
	it("sets locale to user's language if env config is not available", () => {
		const mockContext = {
			app: {},
			store: {
				state: {
					auth: {
						locale: "fi",
					},
				},
			},
		};
		i18n(mockContext);
		const vue18n = mockContext.app.i18n;
		expect(vue18n.locale).toBe("fi");
		expect(vue18n.fallbackLocale).toBe("de");
	});
	it("sets locale 'de' if not env config and nor user language available", () => {
		const mockContext = {
			app: {},
			store: {
				state: {},
			},
		};
		i18n(mockContext);
		const vue18n = mockContext.app.i18n;
		expect(vue18n.locale).toBe("de");
		expect(vue18n.fallbackLocale).toBe("de");
	});
	it("sets locale to env config language if no user language available", () => {
		const mockContext = {
			app: {},
			store: {
				state: {
					"env-config": {
						env: {
							I18N__DEFAULT_LANGUAGE: "ko",
							I18N__FALLBACK_LANGUAGE: "da",
						},
					},
				},
			},
		};
		i18n(mockContext);
		const vue18n = mockContext.app.i18n;
		expect(vue18n.locale).toBe("ko");
		expect(vue18n.fallbackLocale).toBe("da");
	});
});
