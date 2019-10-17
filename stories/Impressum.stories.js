import { storiesOf } from "@storybook/vue";
import Impressum from "@pages/impressum";
import notes from "@docs/storybook/base.md";

storiesOf("Pages", module)
	.addParameters({
		notes,
	})
	.add("Impressum", () => ({
		components: { Impressum },

		template: `
	<div>
		<impressum></impressum>
	</div>
	`,
	}));
