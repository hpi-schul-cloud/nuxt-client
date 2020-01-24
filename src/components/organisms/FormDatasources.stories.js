import { storiesOf } from "@storybook/vue";

import FormDatasources from "./FormDatasources";

storiesOf("Organisms|FormDatasources", module).add("default", () => ({
	components: { FormDatasources },
	template: `<FormDatasources/>`,
	data: () => ({}),
}));
