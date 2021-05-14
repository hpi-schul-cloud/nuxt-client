import { merge } from "lodash";
import serviceTemplate from "@utils/service-template";
const base = serviceTemplate("homework");

const module = {
	actions: {
		getHomeworksDashboard: async function ({ commit }) {
			const res = await this.$axios.$get("/v3/task/dashboard/");
			commit("set", {
				items: res,
			});
		},
	},
};

export default merge(module, base);
