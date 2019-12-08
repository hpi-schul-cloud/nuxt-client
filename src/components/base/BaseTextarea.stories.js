import { storiesOf } from "@storybook/vue";
import { text, number, boolean } from "@storybook/addon-knobs";
import notes from "@docs/storybook/base.md";

import BaseTextarea from "./BaseTextarea";

storiesOf("Base|Base UI", module)
	.addParameters({
		notes,
	})
	.add("BaseTextarea", () => ({
		components: { BaseTextarea },
		data: () => ({
			value: "",
			label: text("label", "Label"),
			placeholder: text("placeholder", "Schreibe hier die Antwort rein."),
			rows: number("rows", 1),
			maxRows: number("maxRows", 5),
			maxLength: number("maxLength", 50),
			withLines: boolean("withLines", false),
			disabled: boolean("disabled", false),
		}),
		template: `
			<div>
				<base-textarea v-model="value" :label="label" :placeholder="placeholder" :rows="rows" :maxRows="maxRows" :maxLength="maxLength" :withLines="withLines" :disabled="disabled"/>
				v-model: {{value}} <br/>
			</div>`,
		methods: {},
	}));
