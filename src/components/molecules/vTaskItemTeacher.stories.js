import { storiesOf } from "@storybook/vue";
import vTaskItemTeacher from "@components/molecules/vTaskItemTeacher";
import mock from "@@/stories/mockData/Tasks";

const { tasksTeacher, drafts } = mock;

storiesOf("0 Vuetify/Molecules", module).add("vTaskItemTeacher", () => ({
	components: {
		vTaskItemTeacher,
	},
	data: () => ({
		task: tasksTeacher[0],
		draft: drafts[0],
		draftWithoutCourse: drafts[1],
	}),
	template: `
		<v-app>
			<h1 class="h4">VTaskItemTeacher</h1>
			<v-list subheader two-line>
				<v-task-item-teacher :task="task"/>
				<v-task-item-teacher :task="draft"/>
				<v-task-item-teacher :task="draftWithoutCourse"/>
			</v-list>
		</v-app>`,
}));
