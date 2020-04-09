import { storiesOf } from "@storybook/vue";
import { text } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";

import InputRadio from "./Radio";
import notes from "./Inputs.md";

storiesOf("6 Organisms/DataFilter/Inputs", module)
	.addParameters({ notes })
	.add("Radio", () => {
		return {
			components: { InputRadio },
			template: `
			<div>
				<InputRadio
					v-model="value"
					label="Label"
					:options="[
						{ value: 'A', label: 'Radio 1' },
						{ value: 'B', label: 'Radio 2' },
						{ value: 'C', label: 'Radio 3' },
					]"
					@input="onInput"
				/>
				value: {{ value }}
			</div>
			`,
			data: () => ({
				value: text("value", "A"),
			}),
			methods: {
				onInput: action("@input"),
				onRemove: action("@remove"),
			},
		};
	});
