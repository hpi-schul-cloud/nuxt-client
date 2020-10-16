import { storiesOf } from "@storybook/vue";
import { text, select, boolean, array } from "@storybook/addon-knobs";
import notes from "@docs/storybook/base.md";

import { email, required } from "vuelidate/lib/validators";

import BaseInput, { supportedTypes } from "./BaseInput";
import BaseIcon from "@basecomponents/BaseIcon";

const defaultTypes = supportedTypes.reduce((obj, val) => {
	obj[val] = val;
	return obj;
}, {});

storiesOf("4 Base UI Components/Inputs/Default", module)
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
	.add("Validation", () => ({
		components: { BaseInput },
		data: () => ({
			type: select("Type", defaultTypes, "text"),
			vmodel: text("Value", ""),
			label: text("Label", "Label"),
			placeholder: text("Placeholder", "Placeholder"),
			validationMessages: [
				{ key: "required", message: "field is required" },
				{ key: "emails", message: "please enter a valid email address" },
			],
		}),
		validations: {
			vmodel: { required, email },
		},
		template: `<base-input :type="type" v-model="vmodel" :label="label" :placeholder="placeholder" :validation-model="$v.vmodel" :validation-messages="validationMessages"/>`,
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
			success: boolean("success", false),
			error: text("error", ""),
		}),
		template: `
			<base-input :type="type" v-model="vmodel" :label="label" :placeholder="placeholder" :info="info" :hint="hint" :error="error" :success="success">
				<template v-slot:icon>
					<base-icon :source="iconSource" :icon="icon" />
				</template>
			</base-input>`,
	}));

storiesOf("4 Base UI Components/Inputs", module)
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
	.add("Radio", () => ({
		components: { BaseInput },
		data: () => ({
			vmodel: text("vmodel", "a"),
			values: array("values", ["a", "b"], ", "),
			labels: array("labels", ["Radio a", "Radio b"], ", "),
			labelHidden: boolean("labelHidden", false),
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
					:label="labels[i]"
					:labelHidden="labelHidden"
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
