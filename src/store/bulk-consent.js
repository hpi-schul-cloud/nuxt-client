export const actions = {};

export const getters = {
	selectedStudents: (state) => state.selectedStudents,
};

export const mutations = {
	setSelectedStudents(state, payload) {
		state.selectedStudents = payload.students;
	},
};

export const state = () => {
	return {
		selectedStudents: ["test"],
	};
};
