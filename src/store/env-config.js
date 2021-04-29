export const actions = {
	async get({ commit }) {
		try {
			const env = await this.$axios.$get("/config/v2");
			commit("setEnv", env);
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
