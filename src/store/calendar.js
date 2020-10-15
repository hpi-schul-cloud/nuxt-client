import serviceTemplate from "@utils/service-template";
import mergeDeep from "@/utils/merge-deep";
const baseUrl = "calendar"
const base = serviceTemplate(baseUrl);

const module = mergeDeep (base, {
	actions: {
		removeDate: async function (ctx, payload) {
			await this.$axios.$delete("/" + baseUrl + "/" + payload.id);
		}
	}
});

export default module;
