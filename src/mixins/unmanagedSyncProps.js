/**
 * @param  {} string
 * @returns string with the first char in uppercase
 */
const upperCaseFirstChar = (string) =>
	string.charAt(0).toUpperCase() + string.slice(1);
/**
 * @param  {} string
 * @returns string formatted in kebap-case
 */
const camelCaseToKebapCase = (string) => {
	return string
		.replace(/[\w]([A-Z])/g, (m) => {
			return m[0] + "-" + m[1];
		})
		.toLowerCase();
};

/**
 * defines a computed Property `$_unmanagedSync${upperCaseFirstChar(prop)}` for each given prop.
 * This computed property acts like a local variable from the data attribute,
 * but can be set by the parent component by setting the prop.
 * When writing to the computed property, an event `update:${camelCaseToKebapCase(prop)}` with the
 * new component value will be emitted, so the parent component can use the .sync modifier to listen for new values.
 * The Advantage of this technique is, that the prop also works with and without a .sync modifier in the parent component.
 *
 * @param props {Array} - Array of prop names
 * @returns a mixin-object that defines all the required props and there according proxy variables.
 * Note: You must also set the props in the component itself. Mixins can not define props. :(
 */
export default (props = []) => {
	if (!Array.isArray(props) || props.some((v) => typeof v !== "string")) {
		throw new Error("props must be an array of string");
	}

	return {
		data() {
			return props.reduce((data, prop) => {
				data[`$_local${upperCaseFirstChar(prop)}`] = undefined;
				return data;
			}, {});
		},
		computed: props.reduce((computed, prop) => {
			computed[`$_unmanagedSync${upperCaseFirstChar(prop)}`] = {
				get() {
					return this[`$_local${upperCaseFirstChar(prop)}`] || this[prop];
				},
				set(to) {
					this[`$_local${upperCaseFirstChar(prop)}`] = to;
					this.$emit(`update:${camelCaseToKebapCase(prop)}`, to);
				},
			};
			return computed;
		}, {}),
		watch: props.reduce((watcher, prop) => {
			watcher[prop] = function (to) {
				this[`$_local${upperCaseFirstChar(prop)}`] = to;
			};
			return watcher;
		}, {}),
	};
};
