import { storiesOf } from "@storybook/vue";

import HomeworksList from "@components/organisms/HomeworksList";
import { homeworks } from "@@/stories/mockData/Homeworks";

storiesOf("6 Organisms/Homeworks/HomeworksList", module).add(
	"HomeworksList",
	() => ({
		components: {
			HomeworksList,
		},
		data: () => ({
			homeworks,
		}),

		template: `<homeworks-list :homeworks="homeworks"/>`,
	})
);
