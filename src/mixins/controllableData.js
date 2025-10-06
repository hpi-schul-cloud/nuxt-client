import { toKebabCase, upperCaseFirstChar } from "@/utils/textFormatting";

// can not start with $ or _ because of Vue restrictions
export const localDataPrefix = "#component";

/**
 * defines a computed property `$_controllableData${upperCaseFirstChar(prop)}` for each given prop-name.
 * This computed property acts like a local variable from the data attribute,
 * but can be set by the parent component using the accorrding prop with "prop-name".
 * When writing to the computed property, an event `update:${toKebabCase(prop)}` with the
 * new component value will be emitted, so the parent component can use the .sync modifier to listen for new values.
 * The Advantage of this technique is, that the prop also works with and without a .sync modifier in the parent component.
 *
 * @param props {Array} - Array of prop names
 * @returns a mixin-object that defines all the required props and there according proxy variables.
 * Note: You must also set the props in the component itself. Mixins can not define props. :(
 */
export default (props) => {
	if (!props || !Array.isArray(props) || props.some((v) => typeof v !== "string")) {
		throw new Error("props must be an array of string");
	}

	return {
		data() {
			return props.reduce((data, prop) => {
				data[`${localDataPrefix}${upperCaseFirstChar(prop)}`] = this[prop];
				return data;
			}, {});
		},
		computed: props.reduce((computed, prop) => {
			computed[`$_controllableData${upperCaseFirstChar(prop)}`] = {
				get() {
					return this[`${localDataPrefix}${upperCaseFirstChar(prop)}`];
				},
				set(to) {
					this[`${localDataPrefix}${upperCaseFirstChar(prop)}`] = to;
					this.$emit(`update:${toKebabCase(prop)}`, to);
				},
			};
			return computed;
		}, {}),
		watch: props.reduce((watcher, prop) => {
			watcher[prop] = function (to) {
				this[`${localDataPrefix}${upperCaseFirstChar(prop)}`] = to;
			};
			return watcher;
		}, {}),
	};
};
