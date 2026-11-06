import { Directive } from "vue";

export const vInputAttrs: Directive<HTMLElement, Record<string, string>> = {
	mounted(el, binding) {
		const input = el.querySelector("input") || el.querySelector("textarea") || el.querySelector("select");
		if (input && binding.value) {
			Object.entries(binding.value).forEach(([key, val]) => {
				input.setAttribute(key, val);
			});
		}
	},
	updated(el, binding) {
		const input = el.querySelector("input") || el.querySelector("textarea") || el.querySelector("select");
		if (input && binding.value) {
			Object.entries(binding.value).forEach(([key, val]) => {
				input.setAttribute(key, val);
			});
		}
	},
};
