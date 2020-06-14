import serviceTemplate from "@utils/service-template";
import mergeDeep from "@utils/merge-deep";
const base = serviceTemplate("activation");

const module = mergeDeep(base, {
	actions: {
		emailReset(ctx, payload = {}) {
			const customEndpoint = "/activation/email";
			return this.$axios.$post(customEndpoint, payload);
		},
	},
});

export default module;
