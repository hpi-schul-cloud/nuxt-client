import { storiesOf } from "@storybook/vue";
import HomeworksList from "@components/organisms/HomeworksList";
import { homeworks, homeworksTeacher } from "@@/stories/mockData/Homeworks";

storiesOf("0 Vuetify/Homeworks/HomeworksList", module)
	.add("HomeworksList Student", () => ({
		components: {
			HomeworksList,
		},
		data: () => ({
			homeworks,
		}),

		template: `
		<v-app>
			<h1 class="h4">Task Overview for Students</h1>
			<homeworks-list :homeworks="homeworks" type="student"/>
		</v-app>`,
	}))
	.add("HomeworksList Teacher", () => ({
		components: {
			HomeworksList,
		},
		data: () => ({
			homeworks: homeworksTeacher,
		}),

		template: `
		<v-app>
			<h1 class="h4">Task Overview for Teachers</h1>
			<homeworks-list :homeworks="homeworks" type="teacher"/>
		</v-app>`,
	}))
	.add("HomeworksListLoading", () => ({
		components: {
			HomeworksList,
		},
		template: `<v-app>
						<v-skeleton-loader type="text" :max-width="'15%'" />
						<v-skeleton-loader
							v-for="homework of 7"
							ref="skeleton"
							:key="homework"
							:type="'list-item-avatar-two-line'"
						/>
					</v-app>`,
	}));
