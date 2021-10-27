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

// TODO: enum for type course and teacher is used at the moment
const createFilter =
	(type = "course") =>
	(value) => ({
		value,
		type,
		text: value,
	});

const hasLoadedElements = (state, tasks) => {
	return state.status === "completed" && tasks.length === 0;
};

// TODO: enum
const existingFilters = {
	"$filter:PrimaryTeacher": filterIsFromPrimaryTeacher,
};

const additionalTeacherFilters = (tasks, selectedFilters) => {
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
			existingTeacherFilters: ["$filter:PrimaryTeacher"],
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
		setFilter(state, filterNames) {
			state.selectedFilters = filterNames.filter(
				(name) => existingFilters[name]
			);
			state.courseFilter = filterNames.filter((name) => !existingFilters[name]);
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
			return hasLoadedElements(state, state.tasks);
		},
		hasNoOpenTasksStudent: (state) => {
			const filterdByCourses = filterByCourses(state.tasks, state.courseFilter);
			const openTasks = filterOpenForstudent(filterdByCourses);

			return hasLoadedElements(state, openTasks);
		},
		hasNoCompletedTasks: (state) => {
			const filterdByCourses = filterByCourses(state.tasks, state.courseFilter);
			const completedTasks = filterCompleted(filterdByCourses);

			return hasLoadedElements(state, completedTasks);
		},
		hasNoOpenTasksTeacher: (state) => {
			const tasks = additionalTeacherFilters(
				state.tasks,
				state.selectedFilters
			);
			const filterdByCourses = filterByCourses(tasks, state.courseFilter);
			const openTasks = filterOpenForTeacher(filterdByCourses);

			return hasLoadedElements(state, openTasks);
		},
		hasNoDrafts: (state) => {
			const tasks = additionalTeacherFilters(
				state.tasks,
				state.selectedFilters
			);
			const filterdByCourses = filterByCourses(tasks, state.courseFilter);
			const draftTasks = filterDrafts(filterdByCourses);

			return hasLoadedElements(state, draftTasks);
		},
		hasFilterSelected: (state) => state.courseFilter.length > 0,
		getTasks: (state) => state.tasks,
		getStatus: (state) => state.status,
		getCourses: (state) => {
			// TODO: check if it is needed at the moment
			const courseNames = extractCourseNamesFromTasks(state.tasks);
			return courseNames;
		},
		getFilters: (state) => {
			const courseNames = extractCourseNamesFromTasks(state.tasks);
			const courseNameFilters = courseNames.map(createFilter());
			const basicFilters = state.existingTeacherFilters.map(
				createFilter("teacher")
			);
			const allFilterNames = [...courseNameFilters, ...basicFilters];

			return allFilterNames;
		},
		getOpenTasksForStudent: (state) => {
			const filterdByCourses = filterByCourses(state.tasks, state.courseFilter);
			const filteredOpenForStudent = filterOpenForTeacher(filterdByCourses);

			const openTasks = {
				overdue: filterOverdue(filteredOpenForStudent),
				noDueDate: filterNoDueDate(filteredOpenForStudent),
				withDueDate: filterWithDueDate(filteredOpenForStudent),
			};

			return openTasks;
		},
		getCompletedTasksForStudent: (state) => {
			const filterdByCourses = filterByCourses(state.tasks, state.courseFilter);

			completedTasks = {
				submitted: filterSubmitted(filterdByCourses),
				graded: filterGraded(filterdByCourses),
			};

			return completedTasks;
		},
		getOpenTasksForTeacher: (state) => {
			const tasks = additionalTeacherFilters(
				state.tasks,
				state.selectedFilters
			);
			const filterdByCourses = filterByCourses(tasks, state.courseFilter);
			const filteredOpenForTeachers = filterOpenForTeacher(filterdByCourses);

			const openTasks = {
				overdue: filterOverdue(filteredOpenForTeachers),
				noDueDate: filterNoDueDate(filteredOpenForTeachers),
				withDueDate: filterWithDueDate(filteredOpenForTeachers),
			};

			return openTasks;
		},
		getDraftTasksForTeacher: (state) => {
			const tasks = additionalTeacherFilters(
				state.tasks,
				state.selectedFilters
			);
			const filteredByCourse = filterByCourses(tasks, state.courseFilter);
			const draftTasks = filterDrafts(filteredByCourse);

			return draftTasks;
		},
		getTasksCountPerCourseStudent: (state, getters) => {
			const courses = getters.getCourses;
			const tasksCount = { open: {}, completed: {} };

			// TODO: use array.map or array.reduce to reduce the needed loops
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

			// TODO: use array.map or array.reduce to reduce the needed loops
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
