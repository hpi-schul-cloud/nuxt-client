import { merge } from "lodash";
import { serviceTemplate } from "@utils";
import AuthModule from "@/store/auth";

const base = serviceTemplate("homework");
const baseState = base.state();

const hasPermission = (permissionString) =>
	AuthModule.getUser.permissions.includes(permissionString);

const TaskPermission = {
	teacher: "TASK_DASHBOARD_TEACHER_VIEW_V3",
	student: "TASK_DASHBOARD_VIEW_V3",
};

const TaskRoutes = {
	open: "/v3/tasks/open/",
	completed: "/v3/tasks/completed/",
};

const module = merge(base, {
	state: () =>
		merge(baseState, {
			courseFilter: [],
		}),
	actions: {
		getHomeworksDashboard: async function ({ commit }) {
			commit("setStatus", "pending");
			try {
				const openPromise = this.$axios.$get(TaskRoutes.open);
				const completedPromise = hasPermission(TaskPermission.student)
					? this.$axios.$get(TaskRoutes.completed)
					: Promise.resolve({ data: [] });

				const [open, completed] = await Promise.all([
					openPromise,
					completedPromise,
				]);

				commit("set", {
					items: [...completed.data, ...open.data],
				});
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
		setFilter(state, payload) {
			state.courseFilter = payload;
		},
	},
	getters: {
		isListEmpty: (state) => {
			return state.status === "completed" && state.list.length === 0;
		},
		isListFilled: (state) => {
			return state.status === "completed" && state.list.length > 0;
		},
		getCourses: (state) => {
			const courses = new Set(
				state.list.map((homework) => homework.courseName)
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
		getHomeworks: (state, getters) => {
			return state.courseFilter.length > 0
				? getters.getFilteredHomeworks
				: state.list;
		},
		getFilteredHomeworks: (state) => {
			const coursesToFilter = state.courseFilter;
			return state.list.filter((homework) => {
				return coursesToFilter.includes(homework.courseName);
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
		getOpenHomeworks: (state, getters) => {
			return getters.getHomeworks.filter((homework) => {
				return homework.status.submitted === 0 && homework.status.graded === 0;
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
		hasNoOpenHomeworks: (state, getters) => {
			return (
				state.status === "completed" && getters.getOpenHomeworks.length === 0
			);
		},
		hasNoCompletedHomeworks: (state, getters) => {
			return (
				state.status === "completed" &&
				getters.getCompletedHomeworks.length === 0
			);
		},
	},
});

export default module;
