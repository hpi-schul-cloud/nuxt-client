// VUE3_UPGRADE - can we remove this?

export const mountDirectives = (app) => {
	app.directive("focus-on-mount", {
		mounted(el, binding) {
			if (binding.value) el.focus();
		},
	});
};
