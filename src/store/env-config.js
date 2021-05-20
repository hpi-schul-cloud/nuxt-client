export const requiredVars = {
	NOT_AUTHENTICATED_REDIRECT_URL: "/login",
	JWT_SHOW_TIMEOUT_WARNING_SECONDS: 3600,
	JWT_TIMEOUT_SECONDS: 7200,
};

export const actions = {
	async get({ commit, dispatch }) {
		try {
			const env = await this.$axios.$get("/config/app/public");
			Object.entries(requiredVars).forEach(([key]) => {
				if (env[key] == null) {
					console.error(`Missing configuration by server for key ${key}`);
				}
			});

			commit("setEnv", env);
			dispatch("autoLogout/init", {}, { root: true });
			dispatch("content/init", {}, { root: true });
			dispatch("filePaths/init", {}, { root: true });
		} catch (error) {
			commit("setError", error);
		}
	},
};

export const mutations = {
	setEnv(state, payload) {
		state.env = { ...requiredVars, ...payload };
	},
	setError(state, error) {
		state.error = error;
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
	};
};

export default {
	actions,
	getters,
	mutations,
	state,
};
