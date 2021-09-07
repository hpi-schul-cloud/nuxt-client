import AuthModule from "@/store/auth";

export default async ({ app }) => {
	const lang = AuthModule.getLocale;
	if (lang) app.i18n.locale = lang;
};
