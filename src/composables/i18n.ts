import { inject, InjectionKey } from "@vue/composition-api";
import VueI18n from "vue-i18n";

export const USE_I18N: InjectionKey<typeof useI18n> = Symbol();

export function useI18n() {
	const i18n = inject<VueI18n>("i18n");

	if (i18n) {
		const t = (key: string): string => {
			const result = i18n.t(key);
			if (typeof result !== "string") {
				throw new Error("i18n complex return type not supported, yet");
			}
			return result;
		};

		return { t };
	}

	throw new Error("i18n not available");
}
