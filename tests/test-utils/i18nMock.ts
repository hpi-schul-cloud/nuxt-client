import { MessageSchema } from "@/locales/schema";
import { mock } from "vitest-mock-extended";

export const i18nMock = mock<{
	t: (key: keyof MessageSchema, placeholders?: Record<string, unknown>) => string;
}>({
	t: (key, placeholders) => {
		const str = `${key} ${placeholders ? ` ${JSON.stringify(placeholders)}` : ""}`;
		return str;
	},
});
