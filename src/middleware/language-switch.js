export default async ({ app, store }) => {
	const lang = store.getters["auth/locale"];
	if (lang) app.i18n.locale = lang;
};
