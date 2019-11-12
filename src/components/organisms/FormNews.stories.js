import { storiesOf } from "@storybook/vue";

import FormNews from "./FormNews";

storiesOf("Organisms|FormNews", module).add("default", () => ({
	components: { FormNews },
	template: `<FormNews />`,
	data: () => ({}),
}));
