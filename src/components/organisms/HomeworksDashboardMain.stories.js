import { storiesOf } from "@storybook/vue";
import HomeworksDashboardMain from "@components/organisms/HomeworksDashboardMain";
import Vuex from "vuex";
import {
	openHomeworksWithoutDueDate,
	openHomeworksWithDueDate,
	overDueHomeworks,
	coursesStudent,
	coursesTeacher,
	overDueHomeworksTeacher,
	dueDateHomeworksTeacher,
	noDueDateHomeworksTeacher,
	submittedHomeworks,
	gradedHomeworks,
	homeworks,
} from "@@/stories/mockData/Homeworks";

storiesOf("0 Vuetify/Templates/HomeworksDashboard", module)
	.add("Homeworks Dashboard Student", () => ({
		components: {
			HomeworksDashboardMain,
		},
		data: () => ({
			overDueHomeworks,
			coursesStudent,
			role: "student",
		}),
		store: new Vuex.Store({
			modules: {
				homeworks: {
					namespaced: true,
					getters: {
						getStatus: () => "completed",
						hasNoHomeworks: () => false,
						getHomeworks: () => homeworks,
						getCourses: () => coursesStudent,
						getOpenHomeworksForStudent: () => ({
							overdue: overDueHomeworks,
							withDueDate: openHomeworksWithDueDate,
							noDueDate: openHomeworksWithoutDueDate,
						}),
						getCompletedHomeworksForStudent: () => ({
							submitted: submittedHomeworks,
							graded: gradedHomeworks,
						}),
					},
					actions: {
						getAllHomeworks: () => {},
						updateFilter: () => {},
					},
				},
			},
		}),
		template: `
		<v-app>
			<homeworks-dashboard-main :role='role' />
		</v-app>`,
	}))
	.add("Homeworks Dashboard Teacher", () => ({
		components: {
			HomeworksDashboardMain,
		},
		data: () => ({
			overDueHomeworksTeacher,
			dueDateHomeworksTeacher,
			noDueDateHomeworksTeacher,
			coursesTeacher,
			role: "teacher",
		}),
		store: new Vuex.Store({
			modules: {
				homeworks: {
					namespaced: true,
					getters: {
						getStatus: () => "completed",
						hasNoHomeworks: () => false,
						getHomeworks: () => homeworks,
						getCourses: () => coursesTeacher,
						getOpenHomeworksForTeacher: () => ({
							overdue: overDueHomeworksTeacher,
							withDueDate: dueDateHomeworksTeacher,
							noDueDate: noDueDateHomeworksTeacher,
						}),
					},
					actions: {
						getAllHomeworks: () => {},
						updateFilter: () => {},
					},
				},
			},
		}),
		template: `
			<v-app>
				<homeworks-dashboard-main :role='role' />
			</v-app>`,
	}));
