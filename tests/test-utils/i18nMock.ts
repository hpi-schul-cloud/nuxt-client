import { createMock } from "@golevelup/ts-jest";
import { useI18n } from "vue-i18n";

export const i18nMock = createMock<ReturnType<typeof useI18n>>({
	t: (key: string | number, named: Record<string, unknown>) => {
		const str = `${key} ${named ? ` ${JSON.stringify(named)}` : ""}`;
		return str;
	},
	// VUE3_UPGRADE tc() was replaced by t() in vue-i18n 9.x and is not part of the I18n interface anymore
});
