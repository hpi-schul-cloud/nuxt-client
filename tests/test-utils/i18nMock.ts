import { MessageSchemaCustom } from "@/locales/schema";
import { createMock } from "@golevelup/ts-jest";

export const i18nMock = createMock<{
	t: (
		key: keyof MessageSchemaCustom,
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
