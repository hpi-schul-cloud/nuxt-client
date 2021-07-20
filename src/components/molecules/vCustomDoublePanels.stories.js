import { storiesOf } from "@storybook/vue";
import vCustomDoublePanels from "./vCustomDoublePanels";

storiesOf("0 Vuetify/Molecules", module).add("vCustomDoublePanels", () => ({
	components: {
		vCustomDoublePanels,
	},
	data: () => ({
		panelOneCount: 1,
		panelTwoCount: 2,
		panelOneTitle: "Panel One",
		panelTwoTitle: "Panel Two",
		status: "completed",
		isEmpty: false,
	}),
	template: `
		<v-app>
			<h1 class="h4">vCustomDoublePanels</h1>
			<p>Integrates v-expansion-panel and v-skeleton-loader. It receives:</p>
			<ul>
				<li>2 slot components</li>
				<li>title for each slot</li>
				<li>
					count for each slot (for example items in a list passed as a slot)
				</li>
				<li>status (which indicates if data is still loading)</li>
				<li>isEmpty (which indicates if loaded data is empty)</li>
			</ul>

			<p>
				Slots are displayed one at a time and can be switched with a collapse
				effect. If status is "pending", v-skeleton-loader is rendered. If the
				loaded data is empty, it won't render its titles and counts.
			</p>

			<v-custom-double-panels
				:panel-one-count='panelOneCount'
				:panel-two-count='panelTwoCount'
				:panel-one-title='panelOneTitle'
				:panel-two-title='panelTwoTitle'
				:status='status'
				:is-empty='isEmpty'>

				<template v-slot:panelOne>
					<div>
						<p>1. Item</p>
					</div>
				</template>
				<template v-slot:panelTwo>
					<div>
						<p>1. Item</p>
						<p>2. Item</p>
					</div>
				</template>
			</v-custom-double-panels>
		</v-app>`,
}));
