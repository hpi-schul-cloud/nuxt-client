import { merge } from "lodash";
import serviceTemplate from "@utils/service-template";
const base = serviceTemplate("homework");

const module = {
	actions: {
		getHomeworksDashboard: async function ({ commit }) {
			commit("setLoading", { homeworks: true });
			const res = await this.$axios.$get("/v3/task/dashboard/");
			commit("set", {
				items: res,
			});
			commit("setLoading", { homeworks: false });
		},
	},
};

export default merge(module, base);
