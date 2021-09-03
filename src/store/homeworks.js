const filterByCourses = (homeworks, courses) => {
	return courses.length
		? homeworks.filter((homework) => {
				return courses.includes(homework.courseName);
		  })
		: homeworks;
};

const filterOpen = (homeworks) => {
	return homeworks.filter(
		(homework) =>
			homework.status.submitted === 0 && homework.status.graded === 0
	);
};

const filterNoDueDate = (homeworks) => {
	return homeworks.filter((homework) => {
		return !homework.duedate;
	});
};

const filterWithDueDate = (homeworks) => {
	return homeworks.filter((homework) => {
		return homework.duedate && new Date(homework.duedate) > new Date();
	});
};

const filterOverdue = (homeworks) => {
	return homeworks.filter((homework) => {
		return homework.duedate && new Date(homework.duedate) < new Date();
	});
};

const filterSubmitted = (homeworks) => {
	return homeworks.filter(
		(homework) => homework.status.submitted > 0 && homework.status.graded === 0
	);
};

const filterGraded = (homeworks) => {
	return homeworks.filter((homework) => homework.status.graded > 0);
};

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
			commit("resetBusinessError");
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
		hasNoHomeworks: (state) => {
			return state.status === "completed" && state.homeworks.length === 0;
		},
		hasOpenHomeworks: (state) => {
			return (
				state.status === "completed" && filterOpen(state.homeworks).length > 0
			);
		},
		hasCompletedHomeworks: (state) => {
			return (
				(state.status === "completed" &&
					filterSubmitted(state.homeworks).length > 0) ||
				filterGraded(state.homeworks).length > 0
			);
		},
		getHomeworks: (state) => state.homeworks,
		getStatus: (state) => state.status,
		getOpenHomeworksForStudent: (state) => {
			const openHomeworks = {};

			openHomeworks.overdue = filterOverdue(
				filterOpen(filterByCourses(state.homeworks, state.courseFilter))
			);
			openHomeworks.noDueDate = filterNoDueDate(
				filterOpen(filterByCourses(state.homeworks, state.courseFilter))
			);
			openHomeworks.withDueDate = filterWithDueDate(
				filterOpen(filterByCourses(state.homeworks, state.courseFilter))
			);

			return openHomeworks;
		},
		getOpenHomeworksForTeacher: (state) => {
			const openHomeworks = {};

			openHomeworks.overdue = filterOverdue(
				filterByCourses(state.homeworks, state.courseFilter)
			);
			openHomeworks.noDueDate = filterNoDueDate(
				filterByCourses(state.homeworks, state.courseFilter)
			);
			openHomeworks.withDueDate = filterWithDueDate(
				filterByCourses(state.homeworks, state.courseFilter)
			);

			return openHomeworks;
		},
		getCompletedHomeworksForStudent: (state) => {
			const completedHomeworks = {};

			completedHomeworks.submitted = filterSubmitted(
				filterByCourses(state.homeworks, state.courseFilter)
			);
			completedHomeworks.graded = filterGraded(
				filterByCourses(state.homeworks, state.courseFilter)
			);

			return completedHomeworks;
		},
		getCourses: (state) => {
			const courses = new Set(
				state.homeworks.map((homework) => homework.courseName)
			);
			return Array.from(courses);
		},
		getCoursesOpen: (state, getters) => {
			const courses = new Set(
				getters.getHomeworks.map((homework) => homework.courseName)
			);
			return Array.from(courses);
		},
		getCoursesCompleted: (state, getters) => {
			const courses = new Set(
				getters.getHomeworks.map((homework) => homework.courseName)
			);
			return Array.from(courses);
		},
	},
};

export default module;
