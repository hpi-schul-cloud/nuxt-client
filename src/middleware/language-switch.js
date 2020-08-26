export default async ({ app, store }) => {
	const lang = store.getters["auth/getLocale"];
	if (lang) app.i18n.locale = lang;
};
