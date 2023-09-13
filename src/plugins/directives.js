// VUE3_MIGRATION

export const mountDirectives = (app) => {
	app.directive("focus-on-mount", {
		inserted: function (el, binding) {
			if (binding.value) el.focus();
		},
	});

	app.directive("outside-click", {
		bind: function (el, binding, vnode) {
			el.clickOutsideEvent = function (event) {
				// here I check that click was outside the el and his childrens
				if (!(el == event.target || el.contains(event.target))) {
					// and if it did, call method provided in attribute value
					vnode.context[binding.expression](event);
				}
			};
			document.body.addEventListener("click", el.clickOutsideEvent);
		},
		unbind: function (el) {
			document.body.removeEventListener("click", el.clickOutsideEvent);
		},
	});
};
