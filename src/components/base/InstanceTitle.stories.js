import { storiesOf } from "@storybook/vue";

import InstanceTile from "@components/base/InstanceTile";

storiesOf("4 Base UI Components/Base UI/InstanceTitle", module).add(
	"InstanceTitle",
	() => ({
		components: { InstanceTile },
		template: `
		<instance-tile :windows="windows"></instance-tile>`,
		data: () => ({
			windows: [
				{
					icon: "hpi",
					url: "https://open.schul-cloud.org/login",
				},
				{
					icon: "brb",
					url: "https://brandenburg.schul-cloud.org/login",
				},
			],
		}),
	})
);
