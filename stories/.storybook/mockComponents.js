import Vue from "vue";
import Vuex from "vuex";
import Vuelidate from "vuelidate";

import "@plugins/global";

// Toasts
import Toasted from "vue-toasted";
Vue.prototype.$toast = Toasted;
Vue.use(Toasted, { duration: 3000 });
Vue.use({
	install: function (Vue, options) {
		Vue.prototype.$toast = Vue.prototype.$toasted;
	},
});

// Dialog
import BaseDialog from "@basecomponents/BaseDialog";
Vue.use(BaseDialog);

// Nuxt Components
import upperFirst from "lodash/upperFirst";
import camelCase from "lodash/camelCase";

function mockComponent(name, template) {
	const componentName = upperFirst(camelCase(name));
	Vue.component(componentName, {
		name: componentName,
		template: template,
	});
}

const mockComponents = {
	nuxt: `<div><slot/></div>`,
	"nuxt-child": `<div><slot/></div>`,
	"nuxt-link": `<div><slot/></div>`,
	"no-ssr": `<div><slot/></div>`,
};

Object.keys(mockComponents).forEach((componentName) =>
	mockComponent(componentName, mockComponents[componentName])
);

Vue.use(Vuex);
Vue.use(Vuelidate);
