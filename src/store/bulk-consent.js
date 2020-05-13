export const actions = {
	async register({ commit }, payload) {
		const res = await this.$axios.$post("/users/skipregistration", {
			dataObjects: payload,
		});
		commit("setRegisteredStudents", res);
		return res;
	},
};

export const getters = {
	selectedStudents: (state) => state.selectedStudents,
};

export const mutations = {
	setSelectedStudents(state, payload) {
		state.selectedStudents = payload.students;
	},
	setRegisteredStudents(state, payload) {
		state.registeredStudents = payload;
	},
};

export const state = () => {
	return {
		selectedStudents: [],
		registeredStudents: [],
	};
};
