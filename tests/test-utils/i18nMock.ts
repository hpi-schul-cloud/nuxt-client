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
});
