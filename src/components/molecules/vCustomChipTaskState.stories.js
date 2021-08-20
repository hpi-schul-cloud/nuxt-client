import { storiesOf } from "@storybook/vue";
import VCustomChipTaskState from "@components/molecules/VCustomChipTaskState";

const dueDate = new Date();
dueDate.setHours(dueDate.getHours() + 2);

const dueDateMinutes = new Date();
dueDateMinutes.setMinutes(dueDateMinutes.getMinutes() + 30);

storiesOf("0 Vuetify/Molecules", module).add("VCustomChipTaskState", () => ({
	components: {
		VCustomChipTaskState,
	},
	data: () => ({
		dueHours: dueDate.toISOString(),
		dueMinutes: dueDateMinutes.toISOString(),
	}),
	template: `
		<v-app>
			<h1 class="h4">VCustomChipTaskState</h1>
			<p>Implements the v-chip component showing different states of homeworks. Current types are "warning", "overdue" and "graded".
				For open tasks it displays remaining time depending on input date either in hours/minutes, while allowing to shorten the time units.
			</p>
			<p>Accepts ISO date string, e.g. {{ dueHours }}</p>
			<v-chip-group>
				<v-custom-chip-task-state :due-date="dueHours" type="warning"/>
				<v-custom-chip-task-state :due-date="dueHours" shorten-unit type="warning"/>
				<v-custom-chip-task-state :due-date="dueMinutes" type="warning"/>
				<v-custom-chip-task-state :due-date="dueMinutes" shorten-unit type="warning"/>
				<v-custom-chip-task-state :due-date="dueHours" type="overdue"/>
				<v-custom-chip-task-state type="graded"/>
			</v-chip-group>
		</v-app>`,
}));
