import { fetchAll } from "@utils";

const isArrayWithElements = (input) => Array.isArray(input) && input.length > 0;

const filterByCourses = (tasks, courses) => {
	let filteredByCourses = tasks;

	if (isArrayWithElements(courses)) {
		filteredByCourses = tasks.filter((task) =>
			courses.includes(task.courseName)
		);
	}

	return filteredByCourses;
};

const filterOpenForTeacher = (tasks) => {
	const filteredTasks = tasks.filter((task) => task.status.isDraft === false);

	return filteredTasks;
};

const filterOpenForStudent = (tasks) => {
	const noDraftTask = tasks.filter((task) => task.status.isDraft === false);
	const notSubmittedOrGraded = noDraftTask.filter(
		(task) => task.status.submitted === 0 && task.status.graded === 0
	);

	return notSubmittedOrGraded;
};

const filterNoDueDate = (tasks) => {
	const withoutDueDate = tasks.filter((task) => !task.duedate);

	return withoutDueDate;
};

const filterWithDueDate = (tasks) => {
	const withDueDate = tasks.filter(
		(task) => task.duedate && new Date(task.duedate) > new Date()
	);

	return withDueDate;
};

const filterOverdue = (tasks) => {
	const overdue = tasks.filter(
		(task) => task.duedate && new Date(task.duedate) < new Date()
	);

	return overdue;
};

// it is a teacher based interpretation or and why or condition?
const filterCompleted = (tasks) => {
	const completed = tasks.filter(
		(task) => task.status.submitted === 1 || task.status.graded === 1
	);

	return completed;
};

const filterSubmitted = (tasks) => {
	const submitted = tasks.filter(
		(task) => task.status.submitted > 0 && task.status.graded === 0
	);

	return submitted;
};

const filterGraded = (tasks) => {
	const graded = tasks.filter((task) => task.status.graded > 0);

	return graded;
};

const filterDrafts = (tasks) => {
	const drafts = tasks.filter((task) => task.status.isDraft === true);

	return drafts;
};

const extractCoursesFromTasks = (tasks) => {
	const courses = {};

	tasks.forEach((task) => {
		// unique based on courseName
		courses[task.courseName] = {
			name: task.courseName,
			isSubstitution: task.status.isSubstitutionTeacher,
		};
	});

	const courseInfos = Object.values(courses);

	return courseInfos;
};

const filterSubstitute = (tasks, withSubstitute) => {
	let result = tasks;
	if (!withSubstitute) {
		result = tasks.filter(
			(task) => task.status.isSubstitutionTeacher === false
		);
	}

	return result;
};

const isLoadedWithElements = (state, tasks) => {
	return state.status === "completed" && tasks.length > 0;
};

const module = {
	state: () => ({
		tasks: [],
		courseFilter: [],
		substituteFilter: false,
		status: "",
		businessError: {
			statusCode: "",
			message: "",
		},
	}),
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
		setCourseFilters(state, courseNames) {
			state.courseFilter = courseNames;
		},
		setSubstituteFilter(state, enabled) {
			state.substituteFilter = enabled;
			if (enabled === false) {
				const courses = extractCoursesFromTasks(state.tasks);
				const filterWithoutSubstitutes = state.courseFilter.filter(
					(courseName) => {
						const isSubstituteCourse = courses.some(
							(course) =>
								course.name === courseName && course.isSubstitution === true
						);

						return !isSubstituteCourse;
					}
				);
				state.courseFilter = filterWithoutSubstitutes;
			}
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
		getSelectedCourseFilters: (state) => state.courseFilter,
		hasTasks: (state) => isLoadedWithElements(state, state.tasks),
		hasOpenTasksStudent: (state) => {
			const filterdByCourses = filterByCourses(state.tasks, state.courseFilter);
			const openTasks = filterOpenForStudent(filterdByCourses);

			return isLoadedWithElements(state, openTasks);
		},
		hasOpenTasksTeacher: (state) => {
			const tasks = filterSubstitute(state.tasks, state.substituteFilter);
			const filterdByCourses = filterByCourses(tasks, state.courseFilter);
			const openTasks = filterOpenForTeacher(filterdByCourses);

			return isLoadedWithElements(state, openTasks);
		},
		hasCompletedTasks: (state) => {
			const filterdByCourses = filterByCourses(state.tasks, state.courseFilter);
			const completedTasks = filterCompleted(filterdByCourses);

			return isLoadedWithElements(state, completedTasks);
		},
		hasDrafts: (state) => {
			const tasks = filterSubstitute(state.tasks, state.substituteFilter);
			const filterdByCourses = filterByCourses(tasks, state.courseFilter);
			const draftTasks = filterDrafts(filterdByCourses);

			return isLoadedWithElements(state, draftTasks);
		},
		hasFilterSelected: (state) => state.courseFilter.length > 0,
		getTasks: (state) => state.tasks,
		getStatus: (state) => state.status,
		getCourseFilters: (state) => {
			const courseFilters = [];
			const courses = extractCoursesFromTasks(state.tasks);

			courses.forEach((c) => {
				if (state.substituteFilter || c.isSubstitution === false) {
					courseFilters.push({
						value: c.name,
						text: c.name,
						isSubstitution: c.isSubstitution,
					});
				}
			});

			return courseFilters;
		},
		isSubstituteFilterEnabled: (state) => state.substituteFilter,
		getOpenTasksForStudent: (state) => {
			const filterdByCourses = filterByCourses(state.tasks, state.courseFilter);
			const filteredOpenForStudent = filterOpenForStudent(filterdByCourses);

			const openTasks = {
				overdue: filterOverdue(filteredOpenForStudent),
				noDueDate: filterNoDueDate(filteredOpenForStudent),
				withDueDate: filterWithDueDate(filteredOpenForStudent),
			};

			return openTasks;
		},
		getCompletedTasksForStudent: (state) => {
			const filterdByCourses = filterByCourses(state.tasks, state.courseFilter);

			const completedTasks = {
				submitted: filterSubmitted(filterdByCourses),
				graded: filterGraded(filterdByCourses),
			};

			return completedTasks;
		},
		getOpenTasksForTeacher: (state) => {
			const tasks = filterSubstitute(state.tasks, state.substituteFilter);
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
			const tasks = filterSubstitute(state.tasks, state.substituteFilter);
			const filteredByCourse = filterByCourses(tasks, state.courseFilter);
			const draftTasks = filterDrafts(filteredByCourse);

			return draftTasks;
		},
		getTasksCountPerCourseStudent: (state) => {
			const courseNames = extractCoursesFromTasks(state.tasks).map(
				(c) => c.name
			);
			const tasksCount = { open: {}, completed: {} };

			courseNames.forEach((name) => {
				const tasksOfCourse = state.tasks.filter(
					(task) => task.courseName === name
				);
				tasksCount.open[name] = filterOpenForStudent(tasksOfCourse).length;
				tasksCount.completed[name] = filterCompleted(tasksOfCourse).length;
			});

			return tasksCount;
		},
		getTasksCountPerCourseTeacher: (state) => {
			const courseNames = extractCoursesFromTasks(state.tasks).map(
				(c) => c.name
			);
			const tasksCount = { open: {}, drafts: {} };

			courseNames.forEach((name) => {
				const tasksOfCourse = state.tasks.filter(
					(task) => task.courseName === name
				);
				tasksCount.open[name] = filterOpenForTeacher(tasksOfCourse).length;
				tasksCount.drafts[name] = filterDrafts(tasksOfCourse).length;
			});

			return tasksCount;
		},
	},
};

export default module;
