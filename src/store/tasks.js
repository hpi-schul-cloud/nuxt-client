import { fetchAll } from "@utils";

const filterByCourses = (tasks, courses) => {
	return courses.length
		? tasks.filter((task) => {
				return courses.includes(task.courseName);
		  })
		: tasks;
};

const filterOpenForTeacher = (tasks) => {
	const filteredTasks = tasks.filter((task) => task.status.isDraft === false);
	return filteredTasks;
};

const filterOpenForStudent = (tasks) => {
	const filteredTasks = tasks.filter((task) => task.status.isDraft === false);
	const notSubmittedOrGraded = filteredTasks.filter(
		(task) => task.status.submitted === 0 && task.status.graded === 0
	);
	return notSubmittedOrGraded;
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

const extractCourseNamesFromTasks = (tasks) => {
	const courses = new Set(tasks.map((task) => task.courseName));
	return Array.from(courses);
};

const filterIsFromPrimaryTeacher = (tasks) => {
	const primaryTeacherTasks = tasks.filter(
		(task) => task.status.isSubstitutionTeacher === false
	);
	return primaryTeacherTasks;
};

// TODO: enum, add translation
const existingFilters = {
	"$filter:PrimaryTeacher": filterIsFromPrimaryTeacher,
};

const filterAdditionalFilters = (tasks, selectedFilters) => {
	let result = tasks;

	selectedFilters.forEach((idendifiere) => {
		result = existingFilters[idendifiere](result);
	});

	return result;
};

const module = {
	state: () => {
		return {
			tasks: [],
			courseFilter: [],
			selectedFilters: [],
			existingFilters: ["$filter:PrimaryTeacher"],
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
		// TODO: rename setCourseFilter
		setFilter(state, payload) {
			const additionalFilters = payload.filter((name) => existingFilters[name]);
			const courseFilters = payload.filter((name) => !existingFilters[name]);

			state.selectedFilters = additionalFilters;
			state.courseFilter = courseFilters;
		},
		// TODO: enum "error", "pending", "completed", "" -> "" should get notLoaded / notInitialized or so and not empty string and this should set by creating this store
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
			const filterdByCourses = filterByCourses(state.tasks, state.courseFilter);
			return (
				state.status === "completed" &&
				filterOpenForstudent(filterdByCourses).length === 0
			);
		},
		hasNoCompletedTasks: (state) => {
			const filterdByCourses = filterByCourses(state.tasks, state.courseFilter);
			return (
				state.status === "completed" &&
				filterCompleted(filterdByCourses).length === 0
			);
		},
		hasNoOpenTasksTeacher: (state) => {
			const tasks = filterAdditionalFilters(state.tasks, state.selectedFilters);
			const filterdByCourses = filterByCourses(tasks, state.courseFilter);
			return (
				state.status === "completed" &&
				filterOpenForTeacher(filterdByCourses).length === 0
			);
		},
		hasNoDrafts: (state) => {
			const tasks = filterAdditionalFilters(state.tasks, state.selectedFilters);
			const filterdByCourses = filterByCourses(tasks, state.courseFilter);
			return (
				state.status === "completed" &&
				filterDrafts(filterdByCourses).length === 0
			);
		},
		hasFilterSelected: (state) => state.courseFilter.length > 0,
		getTasks: (state) => state.tasks,
		getStatus: (state) => state.status,
		getCourses: (state) => {
			const courseNames = extractCourseNamesFromTasks(state.tasks);
			return courseNames;
		},
		getFilters: (state) => {
			const courseNames = extractCourseNamesFromTasks(state.tasks);

			const courseNameFilters = courseNames.map((value) => ({
				value,
				type: "course",
			}));

			const additionalFilters = state.existingFilters.map((value) => ({
				value,
				type: "additional",
			}));

			const allFilterNames = [...courseNameFilters, ...additionalFilters];

			return allFilterNames;
		},
		getOpenTasksForStudent: (state) => {
			const openTasks = {};
			const filterdByCourses = filterByCourses(state.tasks, state.courseFilter);
			const filteredOpenForStudent = filterOpenForTeacher(filterdByCourses);

			openTasks.overdue = filterOverdue(filteredOpenForStudent);
			openTasks.noDueDate = filterNoDueDate(filteredOpenForStudent);
			openTasks.withDueDate = filterWithDueDate(filteredOpenForStudent);

			return openTasks;
		},
		getCompletedTasksForStudent: (state) => {
			const completedTasks = {};
			const filterdByCourses = filterByCourses(state.tasks, state.courseFilter);

			completedTasks.submitted = filterSubmitted(filterdByCourses);
			completedTasks.graded = filterGraded(filterdByCourses);

			return completedTasks;
		},
		getOpenTasksForTeacher: (state) => {
			const openTasks = {};

			const tasks = filterAdditionalFilters(state.tasks, state.selectedFilters);
			const filterdByCourses = filterByCourses(tasks, state.courseFilter);
			const filteredOpenForTeachers = filterOpenForTeacher(filterdByCourses);

			openTasks.overdue = filterOverdue(filteredOpenForTeachers);
			openTasks.noDueDate = filterNoDueDate(filteredOpenForTeachers);
			openTasks.withDueDate = filterWithDueDate(filteredOpenForTeachers);

			return openTasks;
		},
		getDraftTasksForTeacher: (state) => {
			const tasks = filterAdditionalFilters(state.tasks, state.selectedFilters);
			const filteredByCourse = filterByCourses(tasks, state.courseFilter);
			const draftTasks = filterDrafts(filteredByCourse);

			return draftTasks;
		},
		getTasksCountPerCourseStudent: (state, getters) => {
			const courses = getters.getCourses;
			const tasksCount = { open: {}, completed: {} };

			// map or reduce to reduce the loops
			courses.forEach((course) => {
				tasksCount.open[course] = filterOpenForStudent(
					state.tasks.filter((task) => {
						return task.courseName === course;
					})
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
				tasksCount.open[course] = filterOpenForTeacher(
					state.tasks.filter((task) => {
						return task.courseName === course;
					})
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
