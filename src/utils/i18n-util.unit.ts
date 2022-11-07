import VueI18n from "vue-i18n";
import { I18nUtil } from "@utils/i18n-util";
import { ChangeLanguageParamsLanguageEnum } from "@/serverApi/v3";

describe("i18nUtil", () => {
	let i18nUtil: I18nUtil;
	let mockI18nLib: jest.Mocked<VueI18n>;

	beforeEach(() => {
		mockI18nLib = jest.createMockFromModule("vue-i18n");
		mockI18nLib.t = jest.fn();
		i18nUtil = new I18nUtil(mockI18nLib);
	});

	describe("locale", () => {
		it("should call the i18nUtil dependency", () => {
			const expectedLocale = "test";
			mockI18nLib.locale = expectedLocale;

			const locale = i18nUtil.locale();

			expect(locale).toEqual(expectedLocale);
		});

		it("should return uk for ukrain locale", () => {
			mockI18nLib.locale = ChangeLanguageParamsLanguageEnum.Ua;

			const locale = i18nUtil.locale();

			expect(locale).toEqual("uk");
		});

		it("should return default locale when i18n is undefined", () => {
			const defaultLocale = "de";
			i18nUtil = new I18nUtil(undefined);

			const locale = i18nUtil.locale();

			expect(locale).toEqual(defaultLocale);
		});
	});

	describe("t", () => {
		it("should call the i18nUtil dependency", () => {
			const param = "test";

			i18nUtil.t(param);

			expect(mockI18nLib.t).toHaveBeenCalledWith(param);
		});

		it("should return the translationResult", () => {
			const expectedParameter = "test";
			mockI18nLib.t.mockReturnValue(expectedParameter);

			const locale = i18nUtil.t(expectedParameter);

			expect(locale).toEqual(expectedParameter);
		});

		it("should return unknown-translation when translation-key is unknown", () => {
			i18nUtil = new I18nUtil(undefined);

			const locale = i18nUtil.t("test");

			expect(locale).toContain("unknown translation-key:");
		});
	});
});
