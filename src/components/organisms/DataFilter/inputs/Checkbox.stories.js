import { storiesOf } from "@storybook/vue";
import { array } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";

import InputCheckbox from "./Checkbox";
import notes from "./Inputs.md";

storiesOf("6 Organisms/DataFilter/Inputs", module)
	.addParameters({ notes })
	.add("Checkbox", () => {
		return {
			components: { InputCheckbox },
			template: `<div>
			<InputCheckbox
				v-model="value"
				label="Label"
				:options="[
					{ value: 'A', label: 'Checkbox 1' },
					{ value: 'B', label: 'Checkbox 2' },
					{ value: 'C', label: 'Checkbox 3' },
				]"
				@input="onInput"
			/>
			value: [{{ value.join(", ") }}]
		</div>`,
			data: () => ({
				value: array("value", ["A", "B"], ","),
			}),
			methods: {
				onInput: action("@input"),
				onRemove: action("@remove"),
			},
		};
	});
