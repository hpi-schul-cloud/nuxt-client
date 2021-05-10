import { storiesOf } from "@storybook/vue";
import Vuex from "vuex";

import HomeworksList from "@components/organisms/HomeworksList";

storiesOf("6 Organisms/Homeworks/HomeworksList", module).add(
	"HomeworksList",
	() => ({
		components: { HomeworksList },
		store: new Vuex.Store({
			getters: {
				homeworks() {
					return [
						{
							id: "0000000ddddd",
							url: "courses/1234567",
							title: "A new task",
							subtitle: "Task type",
							status: "Draft",
							progress: 32,
						},
					];
				},
			},
		}),

		template: `<homeworks-list/>`,
	})
);
