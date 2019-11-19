import Vue from "vue";

// BaseComponents
import "@/components/base/_globals";

import "./directives";
import "./filter";

// Theme
import Theme from "@theme/config";
Vue.prototype.$theme = Theme;

// Dialog
import BaseDialog from "@/components/base/BaseDialog";
Vue.use(BaseDialog);
