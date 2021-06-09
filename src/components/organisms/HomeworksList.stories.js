import { storiesOf } from "@storybook/vue";
import HomeworksList from "@components/organisms/HomeworksList";
import { homeworks } from "@@/stories/mockData/Homeworks";

storiesOf("0 Vuetify/Homeworks/HomeworksList", module)
	.add("HomeworksList", () => ({
		components: {
			HomeworksList,
		},
		data: () => ({
			homeworks,
		}),

		template: `<v-app><homeworks-list :homeworks="homeworks"/></v-app>`,
	}))
	.add("HomeworksListLoading", () => ({
		components: {
			HomeworksList,
		},
		template: `<v-app>
						<v-skeleton-loader :type="'text'" :max-width="'15%'" />
						<v-skeleton-loader
							v-for="homework of 7"
							ref="skeleton"
							:key="homework"
							:type="'list-item-avatar-two-line'"
						/>
					</v-app>`,
	}));
