export const actions = {
	async register({ commit }, payload) {
		const res = await this.$axios.$post("/users/skipregistration", {
			dataObjects: payload,
		});

		commit("setRegisteredStudents", res);
		return res;
	},
	async findStudents({ commit }, query = {}) {
		const res = await this.$axios.$get("/users/admin/students",{
			query,
			action: "find",
			userType: "students",
		});

		commit("setStudentsData", res);
		return res;
	},
	async updateStudents({ commit }, payload) {
		commit("updateStudentData", payload);
	},
};

export const getters = {
	selectedStudents: (state) => state.selectedStudents,
	selectedStudentsData: (state) => state.selectedStudentsData,
	registeredStudents: (state) => state.registeredStudents,
};

export const mutations = {
	setSelectedStudents(state, payload) {
		state.selectedStudents = payload.students;
	},
	setRegisteredStudents(state, payload) {
		state.registeredStudents = payload;
	},
	setStudentsData(state, payload) {
		state.selectedStudentsData = payload;
	},
	updateStudentData(state, payload) {
		state.selectedStudentsData = payload;
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
	};
};
