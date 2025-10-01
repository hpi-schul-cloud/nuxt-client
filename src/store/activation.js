import mergeDeep from "@/utils/merge-deep";
import serviceTemplate from "@/utils/service-template";
const base = serviceTemplate("activation");
import { $axios } from "@/utils/api";

const activationModule = mergeDeep(base, {
	actions: {
		emailReset(ctx, payload = {}) {
			const customEndpoint = "/v1/activation/eMailAddress";
			return $axios.post(customEndpoint, payload);
		},
	},
});

export default activationModule;
