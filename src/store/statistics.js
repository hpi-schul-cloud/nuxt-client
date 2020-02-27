export const actions = {
	async getGlobalStats({ commit }) {
		const data = await this.$axios.$get("/statistics");
		commit("setGlobalStats", data);
	},
	async getSchoolStats({ commit }) {
		const data = await this.$axios.$get("/statistics?school=myschool");
		commit("setSchoolStats", data);
	},
	async getAccountStats({ commit }) {
		const data = await this.$axios.$get("/statistics/accounts");
		commit("setAccountStats", data);
	},
	async getCoursesStats({ commit }) {
		const data = await this.$axios.$get("/statistics/courses");
		commit("setCoursesStats", data);
	},
};

export const mutations = {
	setGlobalStats(state, payload) {
		state.global = payload;
	},
	setSchoolStats(state, payload) {
		state.school = payload;
	},
	setAccountStats(state, payload) {
		state.accounts = payload;
	},
	setCoursesStats(state, payload) {
		state.courses = payload;
	},
};

export const getters = {
	globalCount: (state) => state.global,
	schoolCount: (state) => state.school,
	accounts: (state) => state.accounts,
	courses: (state) => state.courses,
};

export const state = () => {
	return {
		accounts: [],
		courses: [],
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
