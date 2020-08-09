import mergeDeep from "@utils/merge-deep";
import serviceTemplate from "@utils/service-template";

const base = serviceTemplate("users");

const module = mergeDeep(base, {
	actions: {
		async register({ commit }, payload) {
			const res = await this.$axios.$post("/users/skipregistration", {
				dataObjects: payload,
			});
			commit("setRegisteredStudents", res);
			return res;
		},
		async findStudents({ commit }, query = {}) {
			// debugger;
			const res = await this.$axios.$get("/users", {
				query,
			});
			commit("setStudentsData", res);
			return res;
		},
		updateStudents({ commit }, payload ) {
			debugger;
			commit("setStudentsData", payload);
		},
	},

	getters: {
		selectedStudents: (state) => state.selectedStudents,
		selectedStudentsData: (state) => state.selectedStudentsData,
		testState: (state) => state.testState,
	},

	mutations: {
		setSelectedStudents(state, payload) {
			state.selectedStudents = payload.students;
		},
		setRegisteredStudents(state, payload) {
			state.registeredStudents = payload;
		},
		setStudentsData(state, payload) {
		 	// debugger;
			state.selectedStudentsData = payload;
		},
		updateStudentData(state, payload) {
			// debugger;
			// TODO: this will be change the selectedStudentsData
			state.selectedStudentsData = payload;
		},
		setTestState(state, payload) {
			state.testState = payload;
		},
	},

	state: () => {
		return {
			selectedStudents: [],
			registeredStudents: [],
			selectedStudentsData: [],
			testState: "",
		};
	},
});

export default module;
