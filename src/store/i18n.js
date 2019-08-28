export default {
	namespaced: true,
	state: () => ({
		locales: ["en", "de"],
		locale: "de",
	}),
	mutations: {
		SET_LANG(state, locale) {
			if (state.locales.indexOf(locale) !== -1) {
				state.locale = locale;
			}
		},
	},
	getters: {
		getLocale: (state) => {
			return state.locale;
		},
	},
};
