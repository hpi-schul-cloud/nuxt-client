import { storiesOf } from "@storybook/vue";
import { text } from "@storybook/addon-knobs";

import TextEditor from "./TextEditor";

storiesOf("Molecules|TextEditor", module).add(
	"TextEditor",
	() => ({
		components: { TextEditor },
		data: () => ({
			text: text("Text", "<h1>Hi there,</h1>"),
		}),
		template: `<div>
		<TextEditor v-model="text"/>
		<pre>{{text}}</pre>
	</div>`,
	}),
	{
		knobs: {
			escapeHTML: false,
		},
	}
);
