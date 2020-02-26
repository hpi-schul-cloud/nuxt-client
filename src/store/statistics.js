export const actions = {
	async getGlobalStats({ commit }) {
		const data = await this.$axios.$get("/statistics");
		commit("setGlobalStats", data);
	},
};

export const mutations = {
	setGlobalStats(state, payload) {
		state.global = payload;
	},
	setSchoolStats(state, payload) {
		state.school = payload;
	},
};

export const getters = {
	globalCount: (state) => state.global,
	schoolCount: (state) => state.school,
};

export const state = () => {
	return {
		global: {
			users: 0,
			courses: 0,
			students: 0,
			teachers: 0,
			lessons: 0,
			homeworks: 0,
			teams: 0,
		},
		school: {
			users: 0,
			courses: 0,
			students: 0,
			teachers: 0,
			lessons: 0,
			homeworks: 0,
			teams: 0,
		},
	};
};

export default {
	actions,
	mutations,
	getters,
	state,
};
