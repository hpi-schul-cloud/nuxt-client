import VueI18n from "vue-i18n";
import { inject } from "vue";

export function useTranslation() {
	const i18n: VueI18n | undefined = inject<VueI18n>("i18n");
	if (!i18n) {
		throw new Error("Injection of dependencies failed");
	}

	const t = (key: string, values?: Array<string>) => {
		const translateResult = i18n.t(key, values);
		if (typeof translateResult === "string") {
			return translateResult;
		}
		return "unknown translation-key:" + key;
	};

	return t;
}
