import mergeDeep from "@utils/merge-deep";
import serviceTemplate from "@utils/service-template";
const base = serviceTemplate("datasourcesRuns");

const module = mergeDeep(base, {
	actions: {
		// TODO remove mock implementation when Server is ready
		async create() {
			return Promise.resolve({ _id: "someRandomId" });
		},
		// TODO remove mock implementation when Server is ready
		async get() {
			return Promise.resolve({ _id: "someRandomId", status: "Pending" });
		},
	},
});

export default module;
