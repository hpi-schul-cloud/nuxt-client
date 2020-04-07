import { storiesOf } from "@storybook/vue";
import { array } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";

import InputCheckbox from "./Checkbox";

storiesOf("6 Organisms/DataFilter/Inputs", module)
	.addParameters({
		notes: `
			# DataFilter/Inputs

			additional props can be passed to the inputs using the "attributes" config key. Check [the docs](http://docs.vue-filter-ui.surge.sh/Customize/5-Input.html#interface) for more details.
		`,
	})
	.add("Checkbox", () => {
		return {
			components: { InputCheckbox },
			template: `
			<div>
				<InputCheckbox
					v-model="value"
					:options="[
						{ value: 'A', label: 'Checkbox 1' },
						{ value: 'B', label: 'Checkbox 2' },
						{ value: 'C', label: 'Checkbox 3' },
					]"
					@input="onInput"
				/>
				value: [{{ value.join(", ") }}]
			</div>
			`,
			data: () => ({
				value: array("value", ["A", "B"], ","),
			}),
			methods: {
				onInput: action("@input"),
				onRemove: action("@remove"),
			},
		};
	});
