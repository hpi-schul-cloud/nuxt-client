const upperCaseFirstChar = (text) =>
	text.charAt(0).toUpperCase() + text.slice(1);

const camelCaseToKebapCase = (string) => {
	return string
		.replace(/[\w]([A-Z])/g, (m) => {
			return m[0] + "-" + m[1];
		})
		.toLowerCase();
};

/**
 * @param props {Object} - Object with prop definitions, just like the Vue `props`-Attribute, { prop1: { type: AnyType, ... }, ... }
 * @returns a mixin-object that defines all the required props and there according proxy variables.
 * Note: You must also set the props in the component itself. Mixins can not define props. :(
 */
export default (props = {}) => {
	if (Array.isArray(props)) {
		throw new Error(
			"props must be an object of type: { prop1: { type: AnyType, ... }, ... }"
		);
	}
	const propNames = Object.keys(props);

	return {
		data() {
			return propNames.reduce((data, prop) => {
				data[`local${upperCaseFirstChar(prop)}`] =
					typeof props[prop].default === "function"
						? props[prop].default()
						: props[prop].default; // with implicit undefined
				return data;
			}, {});
		},
		computed: propNames.reduce((computed, prop) => {
			computed[`${prop}Proxy`] = {
				get() {
					return this[`local${upperCaseFirstChar(prop)}`] || this[prop];
				},
				set(to) {
					this[`local${upperCaseFirstChar(prop)}`] = to;
					this.$emit(`update:${camelCaseToKebapCase(prop)}`, to);
				},
			};
			return computed;
		}, {}),
		watch: propNames.reduce((watcher, prop) => {
			watcher[prop] = function (to) {
				console.log(prop, "updated to", to, this);
				this[`local${upperCaseFirstChar(prop)}`] = to;
			};
			return watcher;
		}, {}),
	};
};
