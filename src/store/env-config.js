export const actions = {
	async get({ commit, dispatch }) {
		try {
			const env = await this.$axios.$get("/config/app/public");
			commit("setEnv", env);
			dispatch("autoLogout/init", {}, { root: true });
			dispatch("content/init", {}, { root: true });
		} catch (error) {
			commit("setError", error);
		}
	},
};

export const mutations = {
	setEnv(state, payload) {
		state.env = payload;
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
		env: {},
		error: {},
	};
};

export default {
	actions,
	getters,
	mutations,
	state,
};
