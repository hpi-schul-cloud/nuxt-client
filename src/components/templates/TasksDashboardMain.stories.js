// import { storiesOf } from "@storybook/vue";

// import TasksDashboardMain from "@components/templates/TasksDashboardMain";
// import mock from "@@/stories/mockData/Tasks";

// import { rootStore } from "../../store/index";
// import TaskModule from "../../store/tasks";

// const { tasks } = mock;

// TaskModule.setTasks(tasks);

// storiesOf("0 Vuetify/Templates/TasksDashboard", module)
// 	.add("Tasks Dashboard Student", () => ({
// 		components: {
// 			TasksDashboardMain,
// 		},
// 		data: () => ({
// 			role: "student",
// 		}),
// 		store: rootStore,
// 		template: `
// 		<v-app>
// 			<tasks-dashboard-main :role='role' />
// 		</v-app>`,
// 	}))
// 	.add("Tasks Dashboard Teacher", () => ({
// 		components: {
// 			TasksDashboardMain,
// 		},
// 		data: () => ({
// 			role: "teacher",
// 		}),
// 		store: rootStore,
// 		template: `
// 			<v-app>
// 				<tasks-dashboard-main :role='role' />
// 			</v-app>`,
// 	}));
