// VUE3_UPGRADE - remove this when legacy base components are obsolete

import BaseDialog from "@/components/base/BaseDialog/BaseDialog.vue";
import BaseInput from "@/components/base/BaseInput/BaseInput.vue";
import BaseInputCheckbox from "@/components/base/BaseInput/BaseInputCheckbox.vue";
import BaseInputDefault from "@/components/base/BaseInput/BaseInputDefault.vue";
import BaseInputHidden from "@/components/base/BaseInput/BaseInputHidden.vue";
import BaseInputRadio from "@/components/base/BaseInput/BaseInputRadio.vue";
import BaseLink from "@/components/base/BaseLink.vue";
import BaseModal from "@/components/base/BaseModal.vue";
import BaseQrCode from "@/components/base/BaseQrCode.vue";

export const mountBaseComponents = (app) => {
	app.component("BaseDialog", BaseDialog);
	app.component("BaseInput", BaseInput);
	app.component("BaseInputCheckbox", BaseInputCheckbox);
	app.component("BaseInputDefault", BaseInputDefault);
	app.component("BaseInputHidden", BaseInputHidden);
	app.component("BaseInputRadio", BaseInputRadio);
	app.component("BaseLink", BaseLink);
	app.component("BaseModal", BaseModal);
	app.component("BaseQrCode", BaseQrCode);
};
