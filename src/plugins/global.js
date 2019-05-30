import Vue from "vue";

// BaseComponents
import "@components/ui/_globals";

// HTTP REQUESTS (API)
import "./axios";

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
