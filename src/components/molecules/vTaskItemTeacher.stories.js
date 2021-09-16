import { storiesOf } from "@storybook/vue";
import vTaskItemTeacher from "@components/molecules/vTaskItemTeacher";
import {
	tasksTeacher,
	overDueTasksTeacher,
} from "@@/stories/mockData/Tasks";

storiesOf("0 Vuetify/Molecules", module).add("vTaskItemTeacher", () => ({
	components: {
		vTaskItemTeacher,
	},
	data: () => ({
		task: tasksTeacher[0],
		withoutDue: overDueTasksTeacher[0],
	}),
	template: `
		<v-app>
			<h1 class="h4">VTaskItemTeacher</h1>
			<v-list subheader two-line>
				<v-task-item-teacher :task="task"/>
				<v-task-item-teacher :task="withoutDue"/>
			</v-list>
		</v-app>`,
}));
