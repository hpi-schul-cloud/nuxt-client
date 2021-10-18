import { storiesOf } from "@storybook/vue";
import TasksDashboardMain from "@components/templates/TasksDashboardMain";
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
	tasks,
	drafts,
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
						hasNoOpenTasksStudent: () => false,
						hasNoCompletedTasks: () => false,
						getTasks: () => tasks,
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
						getTasksCountPerCourseStudent: () => ({
							open: { Mathe: 7, Chemie: 1, Biologie: 0 },
							completed: { Mathe: 2, Chemie: 0, Biologie: 1 },
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
			drafts,
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
						hasNoOpenTasksTeacher: () => false,
						hasNoDrafts: () => false,
						getTasks: () => tasks,
						getCourses: () => coursesTeacher,
						getOpenTasksForTeacher: () => ({
							overdue: overDueTasksTeacher,
							withDueDate: dueDateTasksTeacher,
							noDueDate: noDueDateTasksTeacher,
						}),
						getDraftTasksForTeacher: () => drafts,
						getTasksCountPerCourseTeacher: () => ({
							open: { Mathe: 9, Deutsch: 1, "": 0 },
							drafts: { Mathe: 0, Deutsch: 1, "": 2 },
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
