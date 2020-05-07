export const actions = {
	register: async function (users) {
		return (
			await this.dispatch("users/skipRegistration", {
				dataObjects: users,
			})
		).data;
	},
};

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
		selectedStudents: [],
	};
};
