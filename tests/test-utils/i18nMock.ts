import VueI18n from "vue-i18n";

const i18n_tMock = (key: string, values?: VueI18n.Values): string =>
	key + (values ? ` ${JSON.stringify(values)}` : "");

const i18n_tcMock = (
	key: string,
	choice?: VueI18n.Choice,
	values?: VueI18n.Values
): string => i18n_tMock(key, values);

const i18n_teMock = (
	key: string,
	locale?: VueI18n.Locale,
	values?: VueI18n.Values
): string => i18n_tMock(key, values);

export const i18nMock = {
	t: i18n_tMock,
	tc: i18n_tcMock,
	te: i18n_teMock,
};
