import BaseInput from "@/components/base/BaseInput/BaseInput.vue";
import BaseInputCheckbox from "@/components/base/BaseInput/BaseInputCheckbox.vue";
import BaseInputDefault from "@/components/base/BaseInput/BaseInputDefault.vue";

export const mountBaseComponents = (app) => {
	app.component("BaseInput", BaseInput);
	app.component("BaseInputCheckbox", BaseInputCheckbox);
	app.component("BaseInputDefault", BaseInputDefault);
};
