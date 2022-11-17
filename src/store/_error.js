export const defaultState = () => {
	return {
		error: {
			statusCode: null,
			message: null,
		},
		isPresent: false,
	};
};

export const mutations = {
	set(state, { statusCode, message }) {
		state.error.statusCode = statusCode;
		state.error.message = message;
		state.isPresent = true;
	},
	reset(state) {
		Object.assign(state, defaultState());
	},
};

export const getters = {
	get(state) {
		return state.error;
	},
	isPresent(state) {
		return state.isPresent;
	},
};

export default {
	namespaced: true,
	getters,
	mutations,
	state: () => defaultState(),
};
