import mergeDeep from "@utils/merge-deep";
import serviceTemplate from "@utils/service-template";
const base = serviceTemplate("datasources");

const module = mergeDeep(base, {
	actions: {
		async createRun(store, payload = {}) {
			// TODO remove mock when Server is ready
			return Promise.resolve({ _id: "someRandomId" });

			const res = await this.$axios.$post(`/datasourceRuns`, payload);
			return res;
		},
	},
});

export default module;
