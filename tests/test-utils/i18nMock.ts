import { createMock } from "@golevelup/ts-jest";
import { useI18n } from "vue-i18n";

export const i18nMock = createMock<ReturnType<typeof useI18n>>({
	t: (key: string | number, named: Record<string, unknown>) => {
		const str = `${key} ${named ? ` ${JSON.stringify(named)}` : ""}`;
		return str;
	},
	// VUE3_UPGRADE tc() was replaced by t() in vue-i18n 9.x and is not part of the I18n interface anymore
});

// const i18n_tMock = (key: string, values?: VueI18n.Values): string =>
// 	key + (values ? ` ${JSON.stringify(values)}` : "");

// const i18n_tcMock = (
// 	key: string,
// 	choice?: VueI18n.Choice,
// 	values?: VueI18n.Values
// ): string => i18n_tMock(key, values);

// const i18n_teMock = (
// 	key: string,
// 	locale?: VueI18n.Locale,
// 	values?: VueI18n.Values
// ): string => i18n_tMock(key, values);

// export const i18nMock = {
// 	t: i18n_tMock,
// 	tc: i18n_tcMock,
// 	te: i18n_teMock,
// };
