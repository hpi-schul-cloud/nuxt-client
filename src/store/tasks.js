import { fetchAll } from "@utils";

const filterByCourses = (tasks, courses) => {
	return courses.length
		? tasks.filter((task) => {
				return courses.includes(task.courseName);
		  })
		: tasks;
};

const filterOpen = (tasks) => {
	return tasks.filter(
		(task) => task.status.submitted === 0 && task.status.graded === 0
	);
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
		hasNoOpenTasks: (state) => {
			return (
				state.status === "completed" &&
				filterOpen(filterByCourses(state.tasks, state.courseFilter)).length ===
					0
			);
		},
		hasNoCompletedTasks: (state) => {
			return (
				state.status === "completed" &&
				filterCompleted(filterByCourses(state.tasks, state.courseFilter))
					.length === 0
			);
		},
		getTasks: (state) => state.tasks,
		getStatus: (state) => state.status,
		getOpenTasksForStudent: (state) => {
			const openTasks = {};

			openTasks.overdue = filterOverdue(
				filterOpen(filterByCourses(state.tasks, state.courseFilter))
			);
			openTasks.noDueDate = filterNoDueDate(
				filterOpen(filterByCourses(state.tasks, state.courseFilter))
			);
			openTasks.withDueDate = filterWithDueDate(
				filterOpen(filterByCourses(state.tasks, state.courseFilter))
			);

			return openTasks;
		},
		getOpenTasksForTeacher: (state) => {
			const openTasks = {};

			openTasks.overdue = filterOverdue(
				filterByCourses(state.tasks, state.courseFilter)
			);
			openTasks.noDueDate = filterNoDueDate(
				filterByCourses(state.tasks, state.courseFilter)
			);
			openTasks.withDueDate = filterWithDueDate(
				filterByCourses(state.tasks, state.courseFilter)
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
		getCourses: (state) => {
			const courses = new Set(state.tasks.map((task) => task.courseName));
			return Array.from(courses);
		},
	},
};

export default module;
