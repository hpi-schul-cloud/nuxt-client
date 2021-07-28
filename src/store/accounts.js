import mergeDeep from "@utils/merge-deep";
import serviceTemplate from "@utils/service-template";
const base = serviceTemplate("accounts");

const module = mergeDeep(base, {
	actions: {
		getTTL: async function (ctx) {
			return this.$axios.$post("/v1/accounts/jwtTimer");
		},
		resetJwtTimer: async function (ctx) {
			return this.$axios.$post("/v1/accounts/jwtTimer");
		},
	},
});

export default module;
