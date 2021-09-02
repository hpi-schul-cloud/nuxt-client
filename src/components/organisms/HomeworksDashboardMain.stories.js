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
						isListEmpty: () => false,
						getCourses: () => coursesStudent,
						getOverDueHomeworks: () => overDueHomeworks,
						getOpenHomeworksWithDueDate: () => openHomeworksWithDueDate,
						getOpenHomeworksWithoutDueDate: () => openHomeworksWithoutDueDate,
						getSubmittedHomeworks: () => submittedHomeworks,
						getGradedHomeworks: () => gradedHomeworks,
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
						isListEmpty: () => false,
						getCourses: () => coursesTeacher,
						getOverDueHomeworks: () => overDueHomeworksTeacher,
						getOpenHomeworksWithDueDate: () => dueDateHomeworksTeacher,
						getOpenHomeworksWithoutDueDate: () => noDueDateHomeworksTeacher,
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
