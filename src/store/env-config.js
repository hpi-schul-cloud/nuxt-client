export const requiredVars = {
	NOT_AUTHENTICATED_REDIRECT_URL: "/login",
	JWT_SHOW_TIMEOUT_WARNING_SECONDS: 3600,
	JWT_TIMEOUT_SECONDS: 7200,
	SC_THEME: process.env.SC_THEME || "default", // currently not loaded from server, but inserted at build time
};

const retryLimit = 10;

export const actions = {
	async get({ commit, dispatch, state }) {
		try {
			const env = await this.$axios.$get("/v1/config/app/public");
			Object.entries(requiredVars).forEach(([key]) => {
				if (env[key] == null) {
					console.warn(`Missing configuration by server for key ${key}`);
				}
			});

			commit("setEnv", env);
		} catch (error) {
			commit("setError", error);
			console.error(`Configuration could not be loaded from the server`);
			if (state.loadingErrorCount < retryLimit) {
				commit("increaseLoadingErrorCount");
				setTimeout(() => {
					dispatch("get", {});
				}, 500);
			}
		}
		dispatch("autoLogout/init", {}, { root: true });
		dispatch("content/init", {}, { root: true });
		dispatch("filePaths/init", {}, { root: true });
	},
};

export const mutations = {
	setEnv(state, payload) {
		state.env = { ...requiredVars, ...payload };
	},
	setError(state, error) {
		state.error = error;
	},
	increaseLoadingErrorCount(state) {
		state.loadingErrorCount += 1;
	},
};

export const getters = {
	getFallbackLanguage: (state) => {
		return state.env.I18N__FALLBACK_LANGUAGE || "de";
	},
	getDefaultTimezone: (state) => {
		return state.env.I18N__DEFAULT_TIMEZONE || "Europe/Berlin";
	},
	getEnv(state) {
		return state.env;
	},
};

export const state = () => {
	return {
		env: requiredVars,
		error: {},
		loadingErrorCount: 0,
	};
};

export default {
	actions,
	mutations,
	getters,
	state,
	getters,
};
