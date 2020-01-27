import { storiesOf } from "@storybook/vue";


import DatasourceLoginForm from "./DatasourceLoginForm";

storiesOf("Organisms|DatasourceLoginForm", module)
	.add("default", () => ({
		components: { DatasourceLoginForm },
		template: `<DatasourceLoginForm />`,
		data: () => ({}),
	}));
