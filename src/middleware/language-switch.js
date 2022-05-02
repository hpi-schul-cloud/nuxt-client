import { authModule } from "@/store";

export default async ({ app }) => {
	const lang = authModule.getLocale;
	if (lang) app.i18n.locale = lang;
};
