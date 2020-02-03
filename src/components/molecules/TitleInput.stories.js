import { storiesOf } from "@storybook/vue";
import { text } from "@storybook/addon-knobs";

import TitleInput from "./TitleInput";

storiesOf("3 Base UI Components/Inputs/Default", module).add("Title Input", () => ({
	components: { TitleInput },
	data: () => ({
		vmodel: text("value", ""),
		placeholder: text("placeholder", "Placeholder"),
		hint: text("hint", "Hint"),
		label: text("label", "Label"),
	}),
	template: `<title-input type="text" v-model="vmodel" :placeholder="placeholder" :hint="hint" :label="label"/>`,
}));
