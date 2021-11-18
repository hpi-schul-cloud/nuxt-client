import Vuetify from "vuetify";

import mock from "@@/stories/mockData/Tasks";
// @@ do not work for store path
import taskStore from "../../store/tasks";

import dashboard from "./assigned";

const { tasks } = mock;

describe("Tasks/assigned", () => {
	const getAllTasks = jest.fn();

	const mockStore = {
		tasks: {
			getters: Object.assign(taskStore.getters, {
				list: () => tasks,
				loading: () => false,
				hasTasks: () => true,
				getCourses: () => [],
				hasCompletedTasksForStudent: () => true,
			}),
			state: () =>
				Object.assign(taskStore.state(), {
					list: tasks,
					loading: "completed",
				}),
			actions: {
				getAllTasks,
			},
		},
	};

	let vuetify;

	beforeEach(() => {
		vuetify = new Vuetify();
	});

	it(...isValidComponent(dashboard));

	it("has correct page title set in <head>", () => {
		const wrapper = shallowMount(dashboard, {
			...createComponentMocks({
				i18n: true,
				vuetify: true,
				store: mockStore,
				vueMeta: true,
			}),
			vuetify,
		});
		const title = wrapper.vm.$i18n.t("pages.tasks.title");
		expect(wrapper.vm.$metaInfo.title).toBe(title);
	});
});
