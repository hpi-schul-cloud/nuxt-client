import { storiesOf } from "@storybook/vue";
import { boolean, array, text } from "@storybook/addon-knobs";
import notes from "@docs/storybook/base.md";

import BaseInput from "./BaseInput";

storiesOf("4 Base UI Components/Inputs/Checkbox", module)
	.addParameters({
		notes,
	})
	.add("Boolean", () => ({
		components: { BaseInput },
		data: () => ({
			checked: true,
			unchecked: false,
			interminate: undefined,
			label: text("label", "Checkbox"),
			labelHidden: boolean("labelHidden", false),
		}),

		template: `
			<div>
				<base-input
					type="checkbox"
					v-model="unchecked"
					name="switch"
					:label="label + ' - ' + unchecked"
					:labelHidden="labelHidden"
				/>
				<base-input
					type="checkbox"
					v-model="interminate"
					name="switch"
					:label="label + ' - ' + interminate"
					:showUndefinedState="true"
					:labelHidden="labelHidden"
				/>
				<base-input
					type="checkbox"
					v-model="checked"
					name="switch"
					:label="label + ' - ' + checked"
					:labelHidden="labelHidden"
				/>
			</div>
		`,
	}))
	.add("Array", () => ({
		components: { BaseInput },
		data: () => ({
			vmodel: array("vmodel", ["a"], ", "),
			values: array("values", ["a", "b"], ", "),
			labels: array("labels", ["Checkbox a", "Checkbox b"], ", "),
			labelHidden: boolean("labelHidden", false),
		}),
		template: `
			<div role="group" aria-label="checkboxes">
				<base-input
					v-for="(value, i) in values"
					:key="value"
					type="checkbox"
					v-model="vmodel"
					:value="value"
					name="checkbox"
					:label="labels[i]"
					:labelHidden="labelHidden"
				/>
				<p> {{ vmodel.join(", ")}} </p>
			</div>
		`,
	}));

storiesOf("4 Base UI Components/Inputs/Switch", module)
	.addParameters({
		notes,
	})
	.add("Boolean", () => ({
		components: { BaseInput },
		data: () => ({
			checked: true,
			unchecked: false,
			labelHidden: boolean("labelHidden", false),
		}),
		template: `
		<div>
		<base-input
			type="switch"
			v-model="unchecked"
			name="switch"
			label="Switch - false"
			:labelHidden="labelHidden"
		/>
		<base-input
			type="switch"
			v-model="checked"
			name="switch"
			label="Switch - true"
			:labelHidden="labelHidden"
		/>
	</div>
		`,
	}))
	.add("Array", () => ({
		components: { BaseInput },
		data: () => ({
			vmodel: array("vmodel", ["a"], ", "),
			values: array("values", ["a", "b"], ", "),
			labels: array("labels", ["Checkbox a", "Checkbox b"], ", "),
			labelHidden: boolean("labelHidden", false),
		}),
		template: `
			<div role="group" aria-label="checkboxes">
				<base-input
					v-for="(value, i) in values"
					:key="value"
					type="switch"
					v-model="vmodel"
					:value="value"
					name="checkbox"
					:label="labels[i]"
					:labelHidden="labelHidden"
				/>
				<p> {{ vmodel.join(", ")}} </p>
			</div>
		`,
	}));
