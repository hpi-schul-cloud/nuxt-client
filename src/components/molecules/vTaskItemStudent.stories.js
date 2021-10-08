import { storiesOf } from "@storybook/vue";
import vTaskItemStudent from "@components/molecules/vTaskItemStudent";
import {
	tasks,
	overDueTasks,
	submittedTasks,
	gradedTasks,
	missedButGradedTasks,
} from "@@/stories/mockData/Tasks";

const current = new Date();
current.setHours(current.getHours() + 1);
const closeToDueDate = current.toISOString();

const taskCloseToDueDate = {
	id: "59cce2c61113d1132c98dc02",
	_id: "59cce2c61113d1132c98dc02",
	name: "Private Aufgabe von Marla - mit Kurs, abgelaufen",
	displayColor: "#FFC400",
	duedate: closeToDueDate,
	courseName: "Mathe",
	createdAt: "2017-09-28T11:49:39.924Z",
};

current.setHours(current.getHours() + 1);
const closeToDueDateHours = current.toISOString();

const taskCloseToDueDateHours = {
	id: "59cce2c61113d1132c98dc02",
	_id: "59cce2c61113d1132c98dc02",
	name: "Private Aufgabe von Marla - mit Kurs, abgelaufen",
	displayColor: "#1DE9B6",
	duedate: closeToDueDateHours,
	courseName: "Mathe",
	createdAt: "2017-09-28T11:49:39.924Z",
};

storiesOf("0 Vuetify/Molecules", module).add("vTaskItemStudent", () => ({
	components: {
		vTaskItemStudent,
	},
	data: () => ({
		task: tasks[0],
		overdue: overDueTasks[0],
		close: taskCloseToDueDate,
		closeHours: taskCloseToDueDateHours,
		submittedTask: submittedTasks[0],
		gradedTask: gradedTasks[0],
		missedButGradedTask: missedButGradedTasks[0],
	}),
	template: `
		<v-app>
			<h1 class="h4">VTaskItemStudent</h1>
			<p>List item representation of a task. The current state of the task is visualized through the icon. Icons take the selected course color or the default color of "#54616e". Displays a warning badge if a task is close to its due date.</p>
			<v-list subheader two-line>
				<v-task-item-student :task="task"/>
				<v-task-item-student :task="close"/>
				<v-task-item-student :task="closeHours"/>
				<v-task-item-student :task="overdue"/>
				<v-task-item-student :task="submittedTask"/>
				<v-task-item-student :task="gradedTask"/>
				<v-task-item-student :task="missedButGradedTask"/>
			</v-list>
		</v-app>`,
}));
