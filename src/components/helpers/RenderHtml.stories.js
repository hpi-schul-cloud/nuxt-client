import { storiesOf } from "@storybook/vue";
import { text } from "@storybook/addon-knobs";

import RenderHtml from "./RenderHtml";

storiesOf("Helpers|RenderHtml", module).add(
	"default",
	() => ({
		components: { RenderHtml },
		template: `<RenderHtml :html="html" />`,
		data: () => ({
			html: text("html", '<base-button design="primary">Button</base-button>'),
		}),
	}),
	{
		knobs: {
			escapeHTML: false,
		},
	}
);
