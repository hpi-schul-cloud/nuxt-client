import { storiesOf } from "@storybook/vue";

import FormDatasourceLogin from "./FormDatasourceLogin";

storiesOf("Organisms|FormDatasourceLogin", module).add("default", () => ({
	components: { FormDatasourceLogin },
	template: `<FormDatasourceLogin />`,
	data: () => ({}),
}));
