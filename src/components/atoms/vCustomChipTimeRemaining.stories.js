import { storiesOf } from "@storybook/vue";
import VCustomChipTimeRemaining from "@components/atoms/VCustomChipTimeRemaining";

const dueDate = new Date();
dueDate.setHours(dueDate.getHours() + 2);

const dueDateMinutes = new Date();
dueDateMinutes.setMinutes(dueDateMinutes.getMinutes() + 30);

storiesOf("0 Vuetify/Atoms", module).add(
	"VCustomChipTimeRemaining",
	() => ({
		components: {
			VCustomChipTimeRemaining,
		},
		data: () => ({
			dueHours: dueDate.toISOString(),
			dueMinutes: dueDateMinutes.toISOString(),
		}),
		template: `
		<v-app>
			<h1 class="h4">VCustomChipTimeRemaining</h1>
			<p>Implements the v-chip component and displays remaining time depending on input date.
				Displays either remaining time in hours/minutes.
				Also allows to shorten the time units
			</p>
			<p>Accepts ISO date string, e.g. {{ dueHours }}</p>
			<v-chip-group>
				<v-custom-chip-time-remaining :due-date="dueHours" type="warning"/>
				<v-custom-chip-time-remaining :due-date="dueHours" shorten-unit type="warning"/>
				<v-custom-chip-time-remaining :due-date="dueMinutes" type="warning"/>
				<v-custom-chip-time-remaining :due-date="dueMinutes" shorten-unit type="warning"/>
			</v-chip-group>
		</v-app>`,
	})
);
