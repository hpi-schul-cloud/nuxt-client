import { storiesOf } from "@storybook/vue";
import { text } from "@storybook/addon-knobs";
import notes from "@docs/storybook/helpers/RenderHtml.md";

import RenderHtml from "./RenderHtml";

storiesOf('Helpers/RenderHtml', module)
	.addParameters({
		notes,
	})
	.add(
		"default",
		() => ({
			components: { RenderHtml },
			template: `<RenderHtml :html="html" />`,
			data: () => ({
				html: text(
					"html",
					'<base-button design="primary">Button</base-button>'
				),
			}),
		}),
		{
			knobs: {
				escapeHTML: false,
			},
		}
	);
