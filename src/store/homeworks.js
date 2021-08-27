import { merge } from "lodash";
import { serviceTemplate, fetchAll } from "@utils";
import { homeworks } from '@@/stories/mockData/Homeworks';
const base = serviceTemplate("homework");
const baseState = base.state();

const module = merge(base, {
	state: () =>
		merge(baseState, {
			courseFilter: [],
		}),
	actions: {
		getHomeworksDashboard: async function ({ commit }) {
			commit("setStatus", "pending");
			try {
				const data = await fetchAll(this.$axios, "/v3/task/dashboard/");
				commit("set", {
					items: data.concat(homeworks),
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
		getOpenHomeworksWithoutDueDate: (state, getters) => {
			return getters.getOpenHomeworks.filter((homework) => {
				return !homework.duedate;
			});
		},
		getOverDueHomeworks: (state, getters) => {
			return getters.getOpenHomeworks.filter((homework) => {
				return homework.duedate && new Date(homework.duedate) < new Date();
			});
		},
		getOpenHomeworks: (state, getters) => {
			return getters.getHomeworks.filter((homework) => {
				return homework.status.submitted === 0 && homework.status.graded === 0;
			});
		},
		getCompletedHomeworks: (state, getters) => {
			return getters.getHomeworks.filter((homework) => {
				return homework.status.submitted >= 1 || homework.status.graded >= 1;
			});
		},
		getSubmittedHomeworks: (state, getters) => {
			return getters.getCompletedHomeworks.filter((homework) => {
				return homework.status.submitted >= 1 && homework.status.graded === 0;
			});
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
