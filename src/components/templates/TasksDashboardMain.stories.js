import { storiesOf } from "@storybook/vue";
import Vuex from "vuex";

import TasksDashboardMain from "@components/templates/TasksDashboardMain";
import mock from "@@/stories/mockData/Tasks";

import store from "../../store/tasks";

const {
	openTasksWithoutDueDate,
	openTasksWithDueDate,
	overDueTasks,
	overDueTasksTeacher,
	dueDateTasksTeacher,
	noDueDateTasksTeacher,
	submittedTasks,
	gradedTasks,
	tasks,
	drafts,
} = mock;

storiesOf("0 Vuetify/Templates/TasksDashboard", module)
	.add("Tasks Dashboard Student", () => ({
		components: {
			TasksDashboardMain,
		},
		data: () => ({
			role: "student",
		}),
		store: new Vuex.Store({
			modules: {
				tasks: {
					namespaced: true,
					getters: Object.assign(store.getters, {
						getStatus: () => "completed",
						hasTasks: () => true,
						hasOpenTasksStudent: () => true,
						hasCompletedTasks: () => true,
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
						getSelectedCourseFilters: () => [],
					}),
					actions: Object.assign(store.actions, {
						getAllTasks: () => {},
						updateFilter: () => {},
					}),
					state: () => Object.assign(store.state(), { tasks }),
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
			role: "teacher",
		}),
		store: new Vuex.Store({
			modules: {
				tasks: {
					namespaced: true,
					getters: Object.assign(store.getters, {
						getStatus: () => "completed",
						hasTasks: () => true,
						hasOpenTasksTeacher: () => true,
						hasDrafts: () => true,
						getTasks: () => tasks,
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
					}),
					actions: Object.assign(store.actions, {
						getAllTasks: () => {},
						updateFilter: () => {},
					}),
					state: () => Object.assign(store.state(), { tasks }),
				},
			},
		}),
		template: `
			<v-app>
				<tasks-dashboard-main :role='role' />
			</v-app>`,
	}));
