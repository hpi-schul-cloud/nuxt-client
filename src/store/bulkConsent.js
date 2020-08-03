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
	selectedStudentsData: (state) => state.selectedStudentsData,
	testState: (state) => state.testState,
};

export const mutations = {
	setSelectedStudents(state, payload) {
		state.selectedStudents = payload.students;
	},
	setRegisteredStudents(state, payload) {
		state.registeredStudents = payload;
	},
	setStudentsData(state, payload) {
		//debugger;
		state.selectedStudentsData = payload;
	},
	updateStudentData(state, payload) {
		// TODO: this will be change the selectedStudentsData
		state.selectedStudents = payload;
	},
	setTestState(state, payload) {
		state.testState = payload;
	},
};

export const state = () => {
	return {
		selectedStudents: [],
		registeredStudents: [],
		selectedStudentsData: [],
		testState: "",
	};
};
