import { I18nLanguage } from "@/plugins/i18n";
import { createMock } from "@golevelup/ts-jest";

export const i18nMock = createMock<{
	t: (
		key: keyof I18nLanguage,
		placeholders?: Record<string, unknown>
	) => string;
}>({
	t: (key, placeholders) => {
		const str = `${key} ${
			placeholders ? ` ${JSON.stringify(placeholders)}` : ""
		}`;
		return str;
	},
	// VUE3_UPGRADE tc() was replaced by t() in vue-i18n 9.x and is not part of the I18n interface anymore
});
