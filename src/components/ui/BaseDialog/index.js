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
		const defaultParam = {};
		const propsData = Object.assign(defaultParam, params);
		return open(propsData);
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
