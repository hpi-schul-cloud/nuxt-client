import Vue from "vue";
import Dialog from "./BaseDialog";

function open(propsData) {
	const vm = typeof window !== "undefined" && window.Vue ? window.Vue : Vue;
	const DialogComponent = vm.extend(Dialog);
	return new DialogComponent({
		el: document.createElement("div"),
		propsData,
	});
}

const DialogProgrammatic = {
	confirm(params) {
		return open(params);
	},
};

const Plugin = {
	install(Vue) {
		Vue.use(Dialog);
		Vue.prototype.$dialog = DialogProgrammatic;
	},
};

export default Plugin;

export { DialogProgrammatic as BaseDialog };
