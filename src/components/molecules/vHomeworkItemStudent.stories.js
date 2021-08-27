import { storiesOf } from "@storybook/vue";
import vHomeworkItemStudent from "@components/molecules/vHomeworkItemStudent";
import { homeworks, overDueHomeworks, submittedHomeworks, gradedHomeworks, missedButGradedHomeworks } from "@@/stories/mockData/Homeworks";

const current = new Date();
current.setHours(current.getHours() + 1);
const closeToDueDate = current.toISOString();

const homeworkCloseToDueDate = {
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

const homeworkCloseToDueDateHours = {
	id: "59cce2c61113d1132c98dc02",
	_id: "59cce2c61113d1132c98dc02",
	name: "Private Aufgabe von Marla - mit Kurs, abgelaufen",
	displayColor: "#1DE9B6",
	duedate: closeToDueDateHours,
	courseName: "Mathe",
	createdAt: "2017-09-28T11:49:39.924Z",
};

storiesOf("0 Vuetify/Molecules", module).add("vHomeworkItemStudent", () => ({
	components: {
		vHomeworkItemStudent,
	},
	data: () => ({
		homework: homeworks[0],
		overdue: overDueHomeworks[0],
		close: homeworkCloseToDueDate,
		closeHours: homeworkCloseToDueDateHours,
		submittedHomework: submittedHomeworks[0],
		gradedHomework: gradedHomeworks[0],
		missedButGradedHomework: missedButGradedHomeworks[0],
	}),
	template: `
		<v-app>
			<h1 class="h4">VHomeworkItemStudent</h1>
			<p>List item representation of a homework. The current state of the homework is visualized through the icon. Icons take the selected course color or the default color of "#455B6A". Displays a warning badge if a task is close to its due date.</p>
			<v-list subheader two-line>
				<v-homework-item-student :homework="homework"/>
				<v-homework-item-student :homework="close"/>
				<v-homework-item-student :homework="closeHours"/>
				<v-homework-item-student :homework="overdue"/>
				<v-homework-item-student :homework="submittedHomework"/>
				<v-homework-item-student :homework="gradedHomework"/>
				<v-homework-item-student :homework="missedButGradedHomework"/>
			</v-list>
		</v-app>`,
}));
