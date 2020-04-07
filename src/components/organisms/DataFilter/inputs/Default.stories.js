import { storiesOf } from "@storybook/vue";
import { text } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";

import InputDefault from "./Default";

storiesOf("6 Organisms/DataFilter/Inputs", module)
	.addParameters({
		notes: `
			# DataFilter/Inputs

			additional props can be passed to the inputs using the "attributes" config key. Check [the docs](http://docs.vue-filter-ui.surge.sh/Customize/5-Input.html#interface) for more details.
		`,
	})
	.add("Default", () => {
		return {
			components: { InputDefault },
			template: `
			<InputDefault
				v-model="value"
				label="Label"
				type="text"
				@input="onInput"
			/>`,
			data: () => ({
				value: text("value", "some value"),
			}),
			methods: {
				onInput: action("@input"),
				onRemove: action("@remove"),
			},
		};
	});
