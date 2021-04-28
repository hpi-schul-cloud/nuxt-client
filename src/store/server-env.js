export const actions = {
	async get({ commit }) {
		const me = await this.$axios.$get("/me");

		const env = me.envVariables;

		commit("setEnv", env);
	},
};

export const mutations = {
	setEnv(state, payload) {
		state.env = payload;
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
	};
};

export default {
	actions,
	getters,
	mutations,
	state,
};
