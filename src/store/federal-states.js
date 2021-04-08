export const actions = {
	async find({ commit }, payload) {
		const { _id } = payload;
		const data = await this.$axios.$get(`/federalStates/${_id}`);
		commit("setFederalState", data);
	},
};

export const getters = {
	federalState: (state) => state.federalState,
};

export const mutations = {
	setFederalState(state, payload) {
		state.federalState = payload;
	},
};

export const state = () => {
	return {
		federalState: {},
	};
};
