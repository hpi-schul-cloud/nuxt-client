import BaseInput from "@/components/base/BaseInput/BaseInput.vue";
import BaseInputDefault from "@/components/base/BaseInput/BaseInputDefault.vue";

export const mountBaseComponents = (app) => {
	app.component("BaseInput", BaseInput);
	app.component("BaseInputDefault", BaseInputDefault);
};
