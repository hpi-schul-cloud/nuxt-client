import serviceTemplate from "@/utils/service-template";
import mergeDeep from "@/utils/merge-deep";
const baseUrl = "calendar";
const base = serviceTemplate(baseUrl);

const calendarModule = mergeDeep(base, {
	actions: {
		removeDate: async function (ctx, payload) {
			(await this.$axios.delete("/v1/" + baseUrl + "/" + payload.id)).data;
		},
	},
});

export default calendarModule;
