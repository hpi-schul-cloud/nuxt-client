import { storiesOf } from "@storybook/vue";

import HomeworksList from "@components/organisms/HomeworksList";
import { homeworks } from "@@/stories/mockData/Homeworks";

storiesOf("0 Vuetify/Homeworks/HomeworksList", module).add(
	"HomeworksList",
	() => ({
		components: {
			HomeworksList,
		},
		data: () => ({
			homeworks,
		}),

		template: `<v-app><homeworks-list :homeworks="homeworks"/></v-app>`,
	})
);
