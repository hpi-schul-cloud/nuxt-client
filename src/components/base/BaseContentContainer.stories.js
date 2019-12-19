import { storiesOf } from "@storybook/vue";
import { text } from "@storybook/addon-knobs";

import BaseContentContainer from "./BaseContentContainer";

storiesOf("Layouts|BaseContentContainer", module)
	.add("default", () => ({
		components: { BaseContentContainer },
		template: `
		<div style="background: orange">
			<base-content-container style="background: lightblue;">
				I am centered content and have a min-width and a max-width.
			</base-content-container>
		</div>`,
	}))
	.add("custom component", () => ({
		components: { BaseContentContainer },
		template: `
		<div style="background: orange">
			<base-content-container style="background: lightblue;" :tag="tag">
				I am a <{{this.tag}}/> centered content and have a min-width and a max-width.
			</base-content-container>
		</div>`,
		data: () => ({ tag: text("tag", "header") }),
	}));
