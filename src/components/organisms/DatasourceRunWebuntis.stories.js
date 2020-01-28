import { storiesOf } from "@storybook/vue";

import DatasourceRunWebuntis from "./DatasourceRunWebuntis";

storiesOf("Organisms/DatasourceRunWebuntis", module).add("default", () => ({
	components: { DatasourceRunWebuntis },
	template: `<DatasourceRunWebuntis :datasource="datasource" />`,
	data: () => ({
		datasource: {
			_id: "95997c385b94c21cc80e88d5",
		},
	}),
}));
