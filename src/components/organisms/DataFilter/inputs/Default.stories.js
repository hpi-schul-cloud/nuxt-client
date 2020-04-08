import { storiesOf } from "@storybook/vue";
import { text } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";

import InputDefault from "./Default";
import notes from "./Inputs.md";

storiesOf("6 Organisms/DataFilter/Inputs", module)
	.addParameters({ notes })
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
