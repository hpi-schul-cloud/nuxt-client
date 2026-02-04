import BaseDialog from "@/components/base/BaseDialog/BaseDialog.vue";
import BaseInput from "@/components/base/BaseInput/BaseInput.vue";
import BaseInputCheckbox from "@/components/base/BaseInput/BaseInputCheckbox.vue";
import BaseInputDefault from "@/components/base/BaseInput/BaseInputDefault.vue";
import BaseModal from "@/components/base/BaseModal.vue";

export const mountBaseComponents = (app) => {
	app.component("BaseDialog", BaseDialog);
	app.component("BaseInput", BaseInput);
	app.component("BaseInputCheckbox", BaseInputCheckbox);
	app.component("BaseInputDefault", BaseInputDefault);
	app.component("BaseModal", BaseModal);
};
