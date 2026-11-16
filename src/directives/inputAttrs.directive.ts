import { Directive, DirectiveBinding } from "vue";

const applyInputAttrs = (el: HTMLElement, binding: DirectiveBinding<Record<string, string>>) => {
	const input = el.querySelector("input") || el.querySelector("textarea") || el.querySelector("select");
	if (input && binding.value) {
		Object.entries(binding.value).forEach(([key, val]) => {
			input.setAttribute(key, val);
		});
	}
};

export const vInputAttrs: Directive<HTMLElement, Record<string, string>> = {
	mounted: applyInputAttrs,
	updated: applyInputAttrs,
};
