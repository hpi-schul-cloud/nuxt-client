import "vuetify/styles";
import { createVuetify } from "vuetify";

import { VSkeletonLoader } from "vuetify/labs/VSkeletonLoader";
import { VStepper } from "vuetify/labs/VStepper";
import { VStepperHeader } from "vuetify/labs/VStepper";
import { VStepperItem } from "vuetify/labs/VStepper";
import { VStepperWindow } from "vuetify/labs/VStepper";
import { VStepperWindowItem } from "vuetify/labs/VStepper";

import theme from "@/vuetify.options";

export default createVuetify({
	components: {
		VSkeletonLoader,
		VStepper,
		VStepperHeader,
		VStepperItem,
		VStepperWindow,
		VStepperWindowItem,
	},
	...theme,
});
