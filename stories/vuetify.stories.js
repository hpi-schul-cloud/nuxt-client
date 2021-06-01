import { storiesOf } from "@storybook/vue";
import { VBtn } from "vuetify/lib";

storiesOf("0 Vuetify/Vuetify", module).add("Default Button", () => ({
	components: { VBtn },
	template: `
	<v-app>
		<div>
			<h1 class="text-h3">Vuetify Buttons</h1>
			<v-btn color="primary">My Btn</v-btn>
		</div>
	</v-app>
	`,
}));
