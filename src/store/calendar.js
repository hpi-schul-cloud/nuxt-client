import serviceTemplate from "@utils/service-template";
import mergeDeep from "@/utils/merge-deep";
const baseUrl = "calendar";
const base = serviceTemplate(baseUrl);

const module = mergeDeep(base, {
	actions: {
		removeDate: async function (ctx, payload) {
			await this.$axios.$delete("/" + baseUrl + "/" + payload.id);
		},
		getEvents: async function (ctx, payload) {
			payload.all = false;
			const res = await this.$axios.$get("/" + baseUrl, { params: payload });
			//do we need to commit?
			return res;
		},
	},
});

export default module;
