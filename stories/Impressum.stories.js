import { storiesOf } from "@storybook/vue";
import Impressum from "@components/molecules/Impressum";
import notes from "@docs/storybook/base.md";

storiesOf("Impressum", module)
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
