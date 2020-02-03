import { storiesOf } from "@storybook/vue";

import FormDatasourceLogin from "./FormDatasourceLogin";

storiesOf("5 Organisms", module).add("FormDatasourceLogin", () => ({
	components: { FormDatasourceLogin },
	template: `<FormDatasourceLogin />`,
	data: () => ({}),
}));
