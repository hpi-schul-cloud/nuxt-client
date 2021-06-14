import { merge } from "lodash";
import { serviceTemplate, fetchAll } from "@utils";
const base = serviceTemplate("homework");

const module = {
	actions: {
		getHomeworksDashboard: async function ({ commit }) {
			commit("setLoading", true);
			try {
				const data = await fetchAll(this.$axios, "/v3/task/dashboard/");
				commit("set", {
					items: data,
				});
				commit("setLoading", false);
			} catch (error) {
				// TODO: extract response.data to businessError format and add a business Error
				commit("setBusinessError", error.response.data);
				commit("setLoading", false);
			}
		},
	},
	getters: {
		isListEmpty: (state) => {
			return state.loading === false && state.list.length === 0;
		},
		isListFilled: (state) => {
			return state.loading === false && state.list.length > 0;
		},
		getOpenHomeworksWithDueDate: (state) => {
			return state.list.filter((homework) => {
				return homework.duedate && new Date(homework.duedate) > new Date();
			});
		},
		getOpenHomeworksWithoutDueDate: (state) => {
			return state.list.filter((homework) => {
				return !homework.duedate;
			});
		},
		getOverDueHomeworks: (state) => {
			return state.list.filter((homework) => {
				return homework.duedate && new Date(homework.duedate) < new Date();
			});
		},
		getOpenHomeworksSortedByDueDate: (state, getters) => {
			const openHomeworksWithDueDate = Array.from(
				getters.getOpenHomeworksWithDueDate
			);
			return openHomeworksWithDueDate.sort((firstHomework, lastHomework) => {
				return new Date(firstHomework.duedate) - new Date(lastHomework.duedate);
			});
		},
		getOpenHomeworks: (state, getters) => {
			const openHomeworksSortedByDueDate = Array.from(
				getters.getOpenHomeworksSortedByDueDate
			);
			const openHomeworksWithoutDueDate = Array.from(
				getters.getOpenHomeworksWithoutDueDate
			);
			return openHomeworksSortedByDueDate.concat(openHomeworksWithoutDueDate);
		},
	},
};

export default merge(module, base);
