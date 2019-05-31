import Vue from "vue";

// BaseComponents
import "@components/ui/_globals";

// HTTP REQUESTS (API)
import axios from "./axios";

// CURRENT USER INFO
import "./user";

// Directives
import Ripple from "vue-ripple-directive";
Vue.directive("ripple", Ripple);

// Theme
import Theme from "@theme/config";
Vue.prototype.$theme = Theme;

// Dialog
import "./dialog";

// i18n
import i18n from "./i18n";

export default function(ctx) {
	axios(ctx);
	i18n(ctx);
}
