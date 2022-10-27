import Vue from "vue";
import VueI18n, { LocaleMessages } from "vue-i18n";
import { authModule, envConfigModule } from "./store";

Vue.use(VueI18n);

function loadLocaleMessages(): LocaleMessages {
	const locales = require.context(
		"./locales",
		true,
		/[A-Za-z0-9-_,\s]+\.json$/i
	);
	const messages: LocaleMessages = {};
	locales.keys().forEach((key) => {
		const matched = key.match(/([A-Za-z0-9-_]+)\./i);
		if (matched && matched.length > 1) {
			const locale = matched[1];
			messages[locale] = locales(key);
		}
	});
	return messages;
}

const locale = authModule && authModule.getLocale ? authModule.getLocale : "de"; // 'de' fallback for unit tests
const fallbackLocale =
	envConfigModule && envConfigModule.getFallbackLanguage
		? envConfigModule.getFallbackLanguage
		: "de"; // 'de' fallback for unit tests

export default new VueI18n({
	locale,
	fallbackLocale,
	messages: loadLocaleMessages(),
});
