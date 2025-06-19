import { MessageSchema } from "@/locales/schema";
import { createMock } from "@golevelup/ts-vitest";

export const i18nMock = createMock<{
	t: (
		key: keyof MessageSchema,
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
