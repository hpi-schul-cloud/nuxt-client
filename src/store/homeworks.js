const module = {
	state: () => {
		return {
			homeworks: [],
			courseFilter: [],
			status: "",
			businessError: {
				statusCode: "",
				message: "",
			},
		};
	},
	actions: {
		getAllHomeworks: async function ({ commit }) {
			commit("setStatus", "pending");
			try {
				const response = await this.$axios.$get("/v3/tasks/");

				commit("setHomeworks", response.data);
				commit("setStatus", "completed");
			} catch (error) {
				if (error.response) {
					commit("setBusinessError", error.response.data);
				}
				commit("setStatus", "error");
			}
		},
	},
	mutations: {
		setHomeworks(state, homeworks) {
			state.homeworks = homeworks;
		},
		setFilter(state, payload) {
			state.courseFilter = payload;
		},
		setStatus(state, status) {
			state.status = status;
		},
		setBusinessError(state, error) {
			state.businessError = error;
		},
		resetBusinessError(state) {
			state.businessError = { statusCode: "", message: "" };
		},
	},
	getters: {
		getStatus: (state) => state.status,
		isListEmpty: (state) => {
			return state.status === "completed" && state.homeworks.length === 0;
		},
		getHomeworks: (state, getters) => {
			return state.courseFilter.length > 0
				? getters.getFilteredHomeworks
				: state.homeworks;
		},
		getFilteredHomeworks: (state) => {
			const coursesToFilter = state.courseFilter;
			return state.homeworks.filter((homework) => {
				return coursesToFilter.includes(homework.courseName);
			});
		},
		getOpenHomeworks: (state, getters) => {
			return getters.getHomeworks.filter((homework) => {
				return homework.status.submitted === 0 && homework.status.graded === 0;
			});
		},
		getOpenHomeworksWithDueDate: (state, getters) => {
			return getters.getOpenHomeworks.filter((homework) => {
				return homework.duedate && new Date(homework.duedate) > new Date();
			});
		},
		getOpenHomeworksWithDueDateTeacher: (state, getters) => {
			return getters.getHomeworks.filter((homework) => {
				return homework.duedate && new Date(homework.duedate) > new Date();
			});
		},
		getOpenHomeworksWithoutDueDate: (state, getters) => {
			return getters.getOpenHomeworks.filter((homework) => {
				return !homework.duedate;
			});
		},
		getOpenHomeworksWithoutDueDateTeacher: (state, getters) => {
			return getters.getHomeworks.filter((homework) => {
				return !homework.duedate;
			});
		},
		getOverDueHomeworks: (state, getters) => {
			return getters.getOpenHomeworks.filter((homework) => {
				return homework.duedate && new Date(homework.duedate) < new Date();
			});
		},
		getOverDueHomeworksTeacher: (state, getters) => {
			return getters.getHomeworks.filter((homework) => {
				return homework.duedate && new Date(homework.duedate) < new Date();
			});
		},
		getCompletedHomeworks: (state, getters) => {
			const completedTask = getters.getHomeworks.filter((homework) => {
				return homework.status.graded >= 1 || homework.status.submitted >= 1;
			});
			return completedTask;
		},
		getSubmittedHomeworks: (state, getters) => {
			const submittedTasks = getters.getHomeworks.filter((homework) => {
				return homework.status.submitted >= 1 && homework.status.graded === 0;
			});
			return submittedTasks;
		},
		getGradedHomeworks: (state, getters) => {
			return getters.getCompletedHomeworks.filter((homework) => {
				return homework.status.graded >= 1;
			});
		},
		hasOpenHomeworks: (state, getters) => {
			return (
				state.status === "completed" && getters.getOpenHomeworks.length > 0
			);
		},
		hasCompletedHomeworks: (state, getters) => {
			return (
				state.status === "completed" && getters.getCompletedHomeworks.length > 0
			);
		},
		getCourses: (state) => {
			const courses = new Set(
				state.homeworks.map((homework) => homework.courseName)
			);
			return Array.from(courses);
		},
		getCoursesOpen: (state, getters) => {
			const courses = new Set(
				getters.getOpenHomeworks.map((homework) => homework.courseName)
			);
			return Array.from(courses);
		},
		getCoursesCompleted: (state, getters) => {
			const courses = new Set(
				getters.getCompletedHomeworks.map((homework) => homework.courseName)
			);
			return Array.from(courses);
		},
	},
};

export default module;
