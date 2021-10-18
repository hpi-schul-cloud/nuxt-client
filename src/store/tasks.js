import { fetchAll } from "@utils";

const filterByCourses = (tasks, courses) => {
	return courses.length
		? tasks.filter((task) => {
				return courses.includes(task.courseName);
		  })
		: tasks;
};

const filterOpen = (tasks, role) => {
	const filteredTasks = tasks.filter((task) => task.status.isDraft === false);

	if (role === "teacher") {
		return filteredTasks;
	}
	if (role === "student") {
		return filteredTasks.filter(
			(task) => task.status.submitted === 0 && task.status.graded === 0
		);
	}
};

const filterNoDueDate = (tasks) => {
	return tasks.filter((task) => {
		return !task.duedate;
	});
};

const filterWithDueDate = (tasks) => {
	return tasks.filter((task) => {
		return task.duedate && new Date(task.duedate) > new Date();
	});
};

const filterOverdue = (tasks) => {
	return tasks.filter((task) => {
		return task.duedate && new Date(task.duedate) < new Date();
	});
};

const filterCompleted = (tasks) => {
	return tasks.filter(
		(task) => task.status.submitted >= 1 || task.status.graded >= 1
	);
};

const filterSubmitted = (tasks) => {
	return tasks.filter(
		(task) => task.status.submitted > 0 && task.status.graded === 0
	);
};

const filterGraded = (tasks) => {
	return tasks.filter((task) => task.status.graded > 0);
};

const filterDrafts = (tasks) => {
	return tasks.filter((task) => task.status.isDraft === true);
};

const module = {
	state: () => {
		return {
			tasks: [],
			courseFilter: [],
			status: "",
			businessError: {
				statusCode: "",
				message: "",
			},
		};
	},
	actions: {
		getAllTasks: async function ({ commit }) {
			commit("resetBusinessError");
			commit("setStatus", "pending");
			try {
				const data = await fetchAll(this.$axios, "/v3/tasks/");

				commit("setTasks", data);
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
		setTasks(state, tasks) {
			state.tasks = tasks;
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
		hasNoTasks: (state) => {
			return state.status === "completed" && state.tasks.length === 0;
		},
		hasNoOpenTasksStudent: (state) => {
			return (
				state.status === "completed" &&
				filterOpen(filterByCourses(state.tasks, state.courseFilter), "student")
					.length === 0
			);
		},
		hasNoCompletedTasks: (state) => {
			return (
				state.status === "completed" &&
				filterCompleted(filterByCourses(state.tasks, state.courseFilter))
					.length === 0
			);
		},
		hasNoOpenTasksTeacher: (state) => {
			return (
				state.status === "completed" &&
				filterOpen(filterByCourses(state.tasks, state.courseFilter), "teacher")
					.length === 0
			);
		},
		hasNoDrafts: (state) => {
			return (
				state.status === "completed" &&
				filterDrafts(filterByCourses(state.tasks, state.courseFilter))
					.length === 0
			);
		},
		hasFilterSelected: (state) => state.courseFilter.length > 0,
		getTasks: (state) => state.tasks,
		getStatus: (state) => state.status,
		getCourses: (state) => {
			const courses = new Set(state.tasks.map((task) => task.courseName));
			return Array.from(courses);
		},
		getOpenTasksForStudent: (state) => {
			const openTasks = {};

			openTasks.overdue = filterOverdue(
				filterOpen(filterByCourses(state.tasks, state.courseFilter), "student")
			);
			openTasks.noDueDate = filterNoDueDate(
				filterOpen(filterByCourses(state.tasks, state.courseFilter), "student")
			);
			openTasks.withDueDate = filterWithDueDate(
				filterOpen(filterByCourses(state.tasks, state.courseFilter), "student")
			);

			return openTasks;
		},
		getCompletedTasksForStudent: (state) => {
			const completedTasks = {};

			completedTasks.submitted = filterSubmitted(
				filterByCourses(state.tasks, state.courseFilter)
			);
			completedTasks.graded = filterGraded(
				filterByCourses(state.tasks, state.courseFilter)
			);

			return completedTasks;
		},
		getOpenTasksForTeacher: (state) => {
			const openTasks = {};

			openTasks.overdue = filterOverdue(
				filterOpen(filterByCourses(state.tasks, state.courseFilter), "teacher")
			);
			openTasks.noDueDate = filterNoDueDate(
				filterOpen(filterByCourses(state.tasks, state.courseFilter), "teacher")
			);
			openTasks.withDueDate = filterWithDueDate(
				filterOpen(filterByCourses(state.tasks, state.courseFilter), "teacher")
			);

			return openTasks;
		},
		getDraftTasksForTeacher: (state) => {
			const draftTasks = filterDrafts(
				filterByCourses(state.tasks, state.courseFilter)
			);

			return draftTasks;
		},
		getTasksCountPerCourseStudent: (state, getters) => {
			const courses = getters.getCourses;
			const tasksCount = { open: {}, completed: {} };

			courses.forEach((course) => {
				tasksCount.open[course] = filterOpen(
					state.tasks.filter((task) => {
						return task.courseName === course;
					}),
					"student"
				).length;

				tasksCount.completed[course] = filterCompleted(
					state.tasks.filter((task) => {
						return task.courseName === course;
					})
				).length;
			});

			return tasksCount;
		},
		getTasksCountPerCourseTeacher: (state, getters) => {
			const courses = getters.getCourses;
			const tasksCount = { open: {}, drafts: {} };

			courses.forEach((course) => {
				tasksCount.open[course] = filterOpen(
					state.tasks.filter((task) => {
						return task.courseName === course;
					}),
					"teacher"
				).length;

				tasksCount.drafts[course] = filterDrafts(
					state.tasks.filter((task) => {
						return task.courseName === course;
					})
				).length;
			});

			return tasksCount;
		},
	},
};

export default module;
