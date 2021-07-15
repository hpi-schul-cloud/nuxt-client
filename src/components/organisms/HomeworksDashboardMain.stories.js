import { storiesOf } from "@storybook/vue";
import HomeworksDashboardMain from "@components/organisms/HomeworksDashboardMain";
import Vuex from "vuex";
import {
	homeworks,
	overDueHomeworks,
	coursesStudent,
	coursesTeacher,
	overDueHomeworksTeacher,
	dueDateHomeworksTeacher,
	noDueDateHomeworksTeacher,
} from "@@/stories/mockData/Homeworks";

storiesOf("0 Vuetify/Homeworks/Templates", module)
	.add("Task Dashboard Student", () => ({
		components: {
			HomeworksDashboardMain,
		},
		data: () => ({
			homeworks,
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
						isListFilled: () => true,
						getCourses: () => coursesStudent,
						getOpenHomeworks: () => homeworks,
						getOverDueHomeworks: () => overDueHomeworks,
					},
					actions: {
						getHomeworksDashboard: () => {},
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
	.add("Task Dashboard Teacher", () => ({
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
						isListFilled: () => true,
						getCourses: () => coursesTeacher,
						getOverDueHomeworks: () => overDueHomeworksTeacher,
						getOpenHomeworksWithDueDate: () => dueDateHomeworksTeacher,
						getOpenHomeworksWithoutDueDate: () => noDueDateHomeworksTeacher,
					},
					actions: {
						getHomeworksDashboard: () => {},
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
