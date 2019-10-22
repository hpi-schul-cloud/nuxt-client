import moment from 'moment';

export const actions = {
	async getMonthlyUsers({ commit }) {
		const data = await this.$axios.$get('/insights/monthlyUsers');
		commit('setMonthlyUsers', data);
	},
	async getWeeklyUsers({ commit }) {
		const data = await this.$axios.$get('/insights/weeklyUsers');
		commit('setWeeklyUsers', data);
	},
	async getDau({ commit }) {
		const data = await this.$axios.$get('/insights/dauOverMau');
		commit('setDau', data);
	},
	async getActivityByRole({ commit }) {
		const data = await this.$axios.$get('/insights/roleActivity');
		commit('setActivityByRole', data);
	},
	async getWeeklyActivity({ commit }) {
		const data = await this.$axios.$get('/insights/weeklyActivity');
		commit('setWeeklyActivity', data);
	},
	async getWeeklyActiveUsers({ commit }) {
		const data = await this.$axios.$get('/insights/weeklyActiveUsers');
		commit('setWeeklyActiveUsers', data);
	},
	async getUniquePageCount({ commit }) {
		const data = await this.$axios.$get('/insights/uniquePageCount');
		commit('setUniquePageCount', data);
	},
	async getAvgPageLoaded({ commit }) {
		const data =[
			{ '2019-10-16T08:00:00.000': '596.5000000000000000' },
			{ '2019-10-16T11:00:00.000': '700.5000000000000000' },
			{ '2019-10-16T13:00:00.000': '320.5000000000000000' },
			{ '2019-10-16T15:00:00.000': '600.5000000000000000' },
			{ '2019-10-16T19:00:00.000': '420.5000000000000000' },
			];

		commit('setAvgPageLoaded', data);
	},
	async getAvgInteractTime({ commit }) {
		const data =[
			{ '2019-10-16T13:00:00.000': '320.5000000000000000' },
			{ '2019-10-16T11:00:00.000': '700.5000000000000000' },
			{ '2019-10-16T08:00:00.000': '596.5000000000000000' },
			{ '2019-10-16T19:00:00.000': '420.5000000000000000' },
			{ '2019-10-16T15:00:00.000': '600.5000000000000000' },
			];

		commit('setAvgInteractTime', data);
	},
}

export const getters = {
	monthlyUsers: state => state.monthlyUsers,
	weeklyUsers: state => state.weeklyUsers,
	dau: state => state.dau,
	activityByRole: state => state.activityByRole,
	weeklyActivity: state => state.weeklyActivity,
	weeklyActiveUsers: state => state.weeklyActiveUsers,
	uniquePageCount: state => state.uniquePageCount,
	avgPageLoaded: state => state.avgPageLoaded,
	avgInteractTime: state => state.avgInteractTime,
}

export const mutations = {
	setMonthlyUsers(state, payload) {
		state.monthlyUsers.current = payload.thisMonth;
		state.monthlyUsers.last = payload.lastMonth;
	},
	setWeeklyUsers(state, payload) {
		state.weeklyUsers.current = payload.thisWeek;
		state.weeklyUsers.last = payload.lastWeek;
	},
	setDau(state, payload) {
		state.dau = payload.dauOverMau;
	},
	setActivityByRole (state, payload) {
		state.activityByRole.teachers = Number(payload.teacherData);
		state.activityByRole.students = Number(payload.studentData);
	},
	setWeeklyActivity (state, payload) {
		state.weeklyActivity = payload;
	},
	setWeeklyActiveUsers (state, payload) {
		const { teacherUsers, studentUsers, activeStudents, activeTeachers } = payload;

		state.weeklyActiveUsers.teachers = { inactive: Number(teacherUsers) - Number(activeTeachers), active: activeTeachers };
		state.weeklyActiveUsers.students = { inactive: Number(studentUsers) - Number(activeStudents), active: activeStudents };
	},
	setUniquePageCount (state, payload) {
		const data = {}
		for (const key in payload) {
			data[moment(key).subtract(10, 'days').calendar()] = payload[key]
		}
		state.uniquePageCount = data;
	},
	setAvgPageLoaded (state, payload) {
		const data = payload.map(el => {
			const obj = {}
			for (const key in el) {
				obj[moment(key).format('LT')] = Number(el[key])
			}
			return obj;
		})
		state.avgPageLoaded = data;
	},
	setAvgInteractTime (state, payload) {
		const data = payload.map(el => {
			const obj = {}
			for (const key in el) {
				obj[moment(key).format('LT')] = Number(el[key])
			}
			return obj;
		})
		state.avgInteractTime = data;
	}
}

export const state = () => {
	return {
		monthlyUsers: {
			current: '',
			last: '',
		},
		weeklyUsers: {
			current: '',
			last: '',
		},
		dau: '',
		activityByRole: {
			teachers: '',
			students: '',
		},
		weeklyActivity: '',
		weeklyActiveUsers: {
			teachers: {
				inactive: '',
				active: '',
			},
			students: {
				inactive: '',
				active: '',
			},
		},
		uniquePageCount: {},
		avgPageLoaded: {},
		avgInteractTime: {},
	}
}
