import { storiesOf } from "@storybook/vue";

import InstanceTile from "@components/molecules/InstanceTile";

storiesOf("4 Molecules UI Components/Molecules UI/InstanceTile", module).add(
	"InstanceTile",
	() => ({
		components: { InstanceTile },
		template: `
		<div v-for="(tile,index) in tiles" :key="index">
			<instance-tile :tile="tile"></instance-tile>
		</div>`,
		data: () => ({
			tiles: [
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
