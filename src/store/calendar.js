import serviceTemplate from "@/utils/service-template";
import mergeDeep from "@/utils/merge-deep";
const baseUrl = "calendar";
const base = serviceTemplate(baseUrl);
import { $axios } from "@/utils/api";

const calendarModule = mergeDeep(base, {
	actions: {
		removeDate: async function (ctx, payload) {
			await $axios.delete("/v1/" + baseUrl + "/" + payload.id);
		},
	},
});

export default calendarModule;
