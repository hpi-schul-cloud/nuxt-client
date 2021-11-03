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
	const overdued = tasks.filter(
		(task) => task.duedate && new Date(task.duedate) < new Date()
	);

	return overdued;
};

// it is a teacher based interpretation or and why or condition?
const filterCompleted = (tasks) => {
	const completed = tasks.filter(
		(task) => task.status.submitted >= 1 || task.status.graded >= 1
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
	const courses = new Set(
		tasks.map((task) => ({
			name: task.courseName,
			isSubstitution: task.status.isSubstitutionTeacher,
		}))
	);

	return Array.from(courses);
};

const filterIsFromPrimaryTeacher = (tasks) => {
	const primaryTeacherTasks = tasks.filter(
		(task) => task.status.isSubstitutionTeacher === false
	);

	return primaryTeacherTasks;
};

const isLoadedWithElements = (state, tasks) => {
	return state.status === "completed" && tasks.length > 0;
};

const executeFilters = (filters = [], tasks) => {
	let result = tasks;
	filters.forEach((f) => {
		if (f.value === true) {
			result = f.exec(tasks);
		}
	});

	return result;
};

// export and enum
const Filters = {
	primary: "$filter:PrimaryTeacher",
};

const module = {
	state: () => ({
		tasks: [],
		courseFilter: [],
		filters: [
			{
				id: Filters.primary,
				value: true,
				exec: filterIsFromPrimaryTeacher,
			},
		],
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
		changeFilters(state, { id, value }) {
			const filters = state.filters.map((f) => {
				if (f.id === id) {
					f.value = value;
				}

				return f;
			});

			state.filters = filters;
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
		hasTasks: (state) => isLoadedWithElements(state, state.tasks),
		hasOpenTasksStudent: (state) => {
			const filterdByCourses = filterByCourses(state.tasks, state.courseFilter);
			const openTasks = filterOpenForStudent(filterdByCourses);

			return isLoadedWithElements(state, openTasks);
		},
		hasOpenTasksTeacher: (state) => {
			const tasks = executeFilters(state.filters, state.tasks);
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
			const tasks = executeFilters(state.filters, state.tasks);
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
			const filter = state.filters.find((f) => f.id === Filters.primary);
			const withSubstitute = !filter.value;

			courses.forEach((c) => {
				if (withSubstitute || c.isSubstitution === false) {
					courseFilters.push({
						value: c.name,
						text: c.name,
						isSubstitution: c.isSubstitution,
					});
				}
			});

			return courseFilters;
		},
		getFilters: (state) => state.filters,
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

			const completedTasks = {
				submitted: filterSubmitted(filterdByCourses),
				graded: filterGraded(filterdByCourses),
			};

			return completedTasks;
		},
		getOpenTasksForTeacher: (state) => {
			const tasks = executeFilters(state.filters, state.tasks);
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
			const tasks = executeFilters(state.filters, state.tasks);
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
