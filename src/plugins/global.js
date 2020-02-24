import Vue from "vue";

// BaseComponents
import "@/components/base/_globals";

import VueMq from "vue-mq";
Vue.use(VueMq, {
	breakpoints: {
		mobile: 750,
		tablet: 991,
		desktop: 1200,
		large: Infinity,
	},
	defaultBreakpoint: "mobile",
});

import "./directives";
import "./filter";

// Theme
import Theme from "@theme/config";
Vue.prototype.$theme = Theme;

// Dialog
import BaseDialog from "@/components/base/BaseDialog";
Vue.use(BaseDialog);

// Input auto resize width based on value
import VueInputAutoWidth from "vue-input-autowidth";
Vue.use(VueInputAutoWidth);
