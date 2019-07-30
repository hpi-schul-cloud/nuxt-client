import mergeDeep from "../utils/merge-deep";
import serviceTemplate from "../utils/service-template";
const base = serviceTemplate("users");

const module = mergeDeep(base, {
	actions: {
		adminFind({ dispatch }, payload = {}) {
			payload.customEndpoint = "/users/admin/students";
			return dispatch("find", payload);
		},
	},
});

export default module;
