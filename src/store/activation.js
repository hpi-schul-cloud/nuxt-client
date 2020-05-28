import serviceTemplate from "@utils/service-template";
import mergeDeep from "@utils/merge-deep";
const base = serviceTemplate("activation");

const module = mergeDeep(base, {
	actions: {
		emailReset: async function (ctx) {
			return this.$axios.$post("/activation/email");
		},
	},
});

export default module;
