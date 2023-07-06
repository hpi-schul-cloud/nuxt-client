import VueI18n from "vue-i18n";

const i118n_tMock = (key: string, values?: VueI18n.Values): string =>
	key + (values ? ` ${JSON.stringify(values)}` : "");

const i118n_tcMock = (
	key: string,
	choice?: VueI18n.Choice,
	values?: VueI18n.Values
): string => i118n_tMock(key, values);

export const i18nMock = {
	t: i118n_tMock,
	tc: i118n_tcMock,
};
