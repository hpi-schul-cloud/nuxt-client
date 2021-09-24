import { storiesOf } from "@storybook/vue";
import TasksDashboardMain from "@components/organisms/TasksDashboardMain";
import Vuex from "vuex";
import {
	openTasksWithoutDueDate,
	openTasksWithDueDate,
	overDueTasks,
	coursesStudent,
	coursesTeacher,
	overDueTasksTeacher,
	dueDateTasksTeacher,
	noDueDateTasksTeacher,
	submittedTasks,
	gradedTasks,
} from "@@/stories/mockData/Tasks";

storiesOf("0 Vuetify/Templates/TasksDashboard", module)
	.add("Tasks Dashboard Student", () => ({
		components: {
			TasksDashboardMain,
		},
		data: () => ({
			overDueTasks,
			coursesStudent,
			role: "student",
		}),
		store: new Vuex.Store({
			modules: {
				tasks: {
					namespaced: true,
					getters: {
						getStatus: () => "completed",
						hasNoTasks: () => false,
						getCourses: () => coursesStudent,
						getOpenTasksForStudent: () => ({
							overdue: overDueTasks,
							withDueDate: openTasksWithDueDate,
							noDueDate: openTasksWithoutDueDate,
						}),
						getCompletedTasksForStudent: () => ({
							submitted: submittedTasks,
							graded: gradedTasks,
						}),
					},
					actions: {
						getAllTasks: () => {},
						updateFilter: () => {},
					},
				},
			},
		}),
		template: `
		<v-app>
			<tasks-dashboard-main :role='role' />
		</v-app>`,
	}))
	.add("Tasks Dashboard Teacher", () => ({
		components: {
			TasksDashboardMain,
		},
		data: () => ({
			overDueTasksTeacher,
			dueDateTasksTeacher,
			noDueDateTasksTeacher,
			coursesTeacher,
			role: "teacher",
		}),
		store: new Vuex.Store({
			modules: {
				tasks: {
					namespaced: true,
					getters: {
						getStatus: () => "completed",
						hasNoTasks: () => false,
						getCourses: () => coursesTeacher,
						getOpenTasksForTeacher: () => ({
							overdue: overDueTasksTeacher,
							withDueDate: dueDateTasksTeacher,
							noDueDate: noDueDateTasksTeacher,
						}),
					},
					actions: {
						getAllTasks: () => {},
						updateFilter: () => {},
					},
				},
			},
		}),
		template: `
			<v-app>
				<tasks-dashboard-main :role='role' />
			</v-app>`,
	}));
