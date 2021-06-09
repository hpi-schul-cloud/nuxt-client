export const requiredVars = {
	NOT_AUTHENTICATED_REDIRECT_URL: "/login",
	JWT_SHOW_TIMEOUT_WARNING_SECONDS: 3600,
	JWT_TIMEOUT_SECONDS: 7200,
};

const retryLimit = 10;

export const actions = {
	async get({ commit, dispatch, state }) {
		try {
			const env = await this.$axios.$get("/config/app/public");
			Object.entries(requiredVars).forEach(([key]) => {
				if (env[key] == null) {
					console.error(`Missing configuration by server for key ${key}`);
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
	state,
};
