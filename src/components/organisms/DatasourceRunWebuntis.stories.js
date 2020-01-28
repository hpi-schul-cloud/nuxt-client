import { storiesOf } from "@storybook/vue";


import DatasourceRunWebuntis from "./DatasourceRunWebuntis";

storiesOf("Organisms|DatasourceRunWebuntis", module)
	.add("default", () => ({
		components: { DatasourceRunWebuntis },
		template: `<DatasourceRunWebuntis />`,
		data: () => ({}),
	}));
