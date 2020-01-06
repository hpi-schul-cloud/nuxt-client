import { storiesOf } from "@storybook/vue";
import { text, select, boolean, array } from "@storybook/addon-knobs";
import notes from "@docs/storybook/base.md";

import BaseInput, { supportedTypes } from "./BaseInput";
import BaseIcon from "@basecomponents/BaseIcon";

const defaultTypes = supportedTypes.reduce((obj, val) => {
	obj[val] = val;
	return obj;
}, {});

storiesOf("Base|Inputs/Default", module)
	.addParameters({
		notes,
	})
	.add("Default", () => ({
		components: { BaseInput },
		data: () => ({
			type: select("Type", defaultTypes, "text"),
			vmodel: text("value", ""),
			label: text("label", "Label"),
			placeholder: text("placeholder", "Placeholder"),
			info: text("info", "Info"),
			hint: text("hint", "Hint"),
		}),
		template: `<base-input :type="type" v-model="vmodel" :label="label" :placeholder="placeholder" :info="info" :hint="hint"/>`,
	}))
	.add("Default h1", () => ({
		components: { BaseInput },
		data: () => ({
			type: select("Type", defaultTypes, "text"),
			vmodel: text("value", ""),
			label: text("label", "Label"),
			placeholder: text("placeholder", "Placeholder"),
			info: text("info", "Info"),
			hint: text("hint", "Hint"),
		}),
		template: `<base-input :type="type" v-model="vmodel" :label="label" :placeholder="placeholder" :info="info" :hint="hint" :input-teaser="true"/>`,
	}))
	.add("Success", () => ({
		components: { BaseInput },
		data: () => ({
			type: select("Type", defaultTypes, "text"),
			vmodel: text("Value", ""),
			label: text("Label", "Label"),
			placeholder: text("Placeholder", "Placeholder"),
			info: text("info", "Info"),
			hint: text("hint", "Hint"),
		}),
		template: `<base-input :type="type" v-model="vmodel" :label="label" :placeholder="placeholder" :info="info" :hint="hint" success/>`,
	}))
	.add("Error", () => ({
		components: { BaseInput },
		data: () => ({
			type: select("Type", defaultTypes, "text"),
			vmodel: text("Value", ""),
			label: text("Label", "Label"),
			placeholder: text("Placeholder", "Placeholder"),
			info: text("info", "Info"),
			hint: text("hint", "Hint"),
		}),
		template: `<base-input :type="type" v-model="vmodel" :label="label" :placeholder="placeholder" :info="info" :hint="hint" error="Error"/>`,
	}))
	.add("Disabled", () => ({
		components: { BaseInput },
		data: () => ({
			type: select("Type", defaultTypes, "text"),
			vmodel: text("Value", ""),
			label: text("Label", "Label"),
			placeholder: text("Placeholder", "Placeholder"),
			info: text("info", "Info"),
			hint: text("hint", "Hint"),
		}),
		template: `<base-input :type="type" v-model="vmodel" :label="label" :placeholder="placeholder" :info="info" :hint="hint" disabled/>`,
	}))
	.add("With icon", () => ({
		components: { BaseInput, BaseIcon },
		data: () => ({
			type: select("Type", defaultTypes, "text"),
			vmodel: text("Value", ""),
			label: text("Label", "Label"),
			placeholder: text("Placeholder", "Placeholder"),
			info: text("info", "Info"),
			hint: text("hint", "Hint"),
			iconSource: select(
				"iconSource",
				{
					material: "material",
					custom: "custom",
					fa: "fa",
				},
				"material"
			),
			icon: text("icon", "alarm"),
		}),
		template: `
			<base-input :type="type" v-model="vmodel" :label="label" :placeholder="placeholder" :info="info" :hint="hint">
				<base-icon slot="icon" :source="iconSource" :icon="icon" />
			</base-input>`,
	}));

storiesOf("Base|Inputs", module)
	.addParameters({
		notes,
	})
	.add("Multiple", () => ({
		components: { BaseInput },
		data: () => ({
			type: select("Type", defaultTypes, "text"),
			vmodel: text("value", ""),
			label: text("label", "Label"),
			placeholder: text("placeholder", "Placeholder"),
			info: text("info", "Info"),
			hint: text("hint", "Hint"),
		}),
		template: `<div style="max-width: 300px">
			<base-input v-for="i in [0,0,0,0,0]" :type="type" v-model="vmodel" :label="label" :placeholder="placeholder" :info="info" :hint="hint"/>
		</div>`,
	}))
	.add("Checkbox", () => ({
		components: { BaseInput },
		data: () => ({
			vmodel: array("vmodel", ["a"], ", "),
			values: array("values", ["a", "b"], ", "),
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
					:label="'Checkbox - ' + value"
				/>
				<p> {{ vmodel.join(", ")}} </p>
			</div>
		`,
	}))
	.add("Switch", () => ({
		components: { BaseInput },
		data: () => ({
			vmodel: boolean("vmodel", true),
			value: text("value", "published"),
		}),
		template: `
			<div>
				<base-input
					type="switch"
					v-model="vmodel"
					:value="value"
					name="switch"
					:label="'Checkbox - ' + value"
				/>
				<p> {{ vmodel}} </p>
			</div>
		`,
	}))
	.add("Radio", () => ({
		components: { BaseInput },
		data: () => ({
			vmodel: text("vmodel", "a"),
			values: array("values", ["a", "b"], ", "),
		}),
		template: `
			<div role="group" aria-label="checkboxes">
				<base-input
					v-for="(value, i) in values"
					:key="value"
					type="radio"
					v-model="vmodel"
					:value="value"
					name="radio"
					:label="'Radio - ' + value"
				/>
				<p> {{ vmodel}} </p>
			</div>
		`,
	}))
	.add("Date", () => ({
		components: { BaseInput },
		data: () => ({
			vmodel: text("Value", "31.12.2019"),
			label: text("Label", "Label"),
			placeholder: text("Placeholder", "Placeholder"),
			info: text("info", "Info"),
			hint: text("hint", "Hint"),
		}),
		template: `<base-input type="date" v-model="vmodel" :label="label" :placeholder="placeholder" :info="info" :hint="hint"/>`,
	}))
	.add("Time", () => ({
		components: { BaseInput },
		data: () => ({
			vmodel: text("Value", "15:00"),
			label: text("Label", "Label"),
			placeholder: text("Placeholder", "Placeholder"),
			info: text("info", "Info"),
			hint: text("hint", "Hint"),
		}),
		template: `<base-input type="time" v-model="vmodel" :label="label" :placeholder="placeholder" :info="info" :hint="hint"/>`,
	}));
