import { storiesOf } from "@storybook/vue";

import InstanceTile from "@components/molecules/InstanceTile";

storiesOf("5 Molecules UI Components/Molecules UI/InstanceTile", module).add(
	"InstanceTile",
	() => ({
		components: { InstanceTile },
		template: `
			<instance-tile :tile="tile"></instance-tile>
		`,
		data: () => ({
			tile: {
				icon: "hpi",
				url: "https://open.hpi-schul-cloud.de/login",
			},
		}),
	})
);
