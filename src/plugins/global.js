import Vue from "vue";

// BaseComponents
import "@/components/base/_globals";

// Directives
import Ripple from "vue-ripple-directive";
Vue.directive("ripple", Ripple);

Vue.directive("click-outside", {
	bind: function(el, binding, vnode) {
		el.clickOutsideEvent = function(event) {
			// here I check that click was outside the el and his childrens
			if (!(el == event.target || el.contains(event.target))) {
				// and if it did, call method provided in attribute value
				vnode.context[binding.expression](event);
			}
		};
		document.body.addEventListener("click", el.clickOutsideEvent);
	},
	unbind: function(el) {
		document.body.removeEventListener("click", el.clickOutsideEvent);
	},
});

// Theme
import Theme from "@theme/config";
Vue.prototype.$theme = Theme;

// Dialog
import BaseDialog from "@/components/base/BaseDialog";
Vue.use(BaseDialog);
