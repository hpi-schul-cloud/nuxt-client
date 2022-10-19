import Vue from "vue";

// BaseComponents
import "@/components/base/_globals";

import VueMq from "vue-mq";
Vue.use(VueMq, {
	breakpoints: {
		mobile: 750,
		tabletPortrait: 770,
		tablet: 991,
		desktop: 1200,
		large: Infinity,
	},
	defaultBreakpoint: "mobile",
});

import "./directives";
import "./filter";

// Theme
import Theme from "@/theme/config";
Vue.prototype.$theme = Theme;

// Dialog
import BaseDialog from "@/components/base/BaseDialog/BaseDialogProgrammatic";
Vue.use(BaseDialog);

// EventBus
import "./eventBus";

// uiState
import uiState from "./uiState";
Vue.use(uiState);
