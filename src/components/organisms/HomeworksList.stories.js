import { storiesOf } from "@storybook/vue";
import Vuex from "vuex";

import HomeworksList from "@components/organisms/HomeworksList";
import { homeworks } from "@@/stories/mockData/Homeworks";

storiesOf("6 Organisms/Homeworks/HomeworksList", module).add(
	"HomeworksList",
	() => ({
		components: {
			HomeworksList,
		},
		store: new Vuex.Store({
			modules: {
				homeworks: {
					namespaced: true,
					state: () => ({
						list: homeworks,
					}),
					getters: {
						list: () => homeworks,
					},
				},
			},
		}),

		template: `<homeworks-list/>`,
	})
);
