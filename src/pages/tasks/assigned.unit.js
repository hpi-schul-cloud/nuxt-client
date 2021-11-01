import dashboard from "./assigned";
import { tasks } from "@@/stories/mockData/Tasks";
import Vuetify from "vuetify";

describe("Tasks/assigned", () => {
	const getAllTasks = jest.fn();
	const mockStore = {
		tasks: {
			getters: {
				list: () => tasks,
				loading: () => false,
				hasTasks: () => true,
				getCourses: () => [],
				hasCompletedTasks: () => true,
			},
			state: () => ({
				list: tasks,
				loading: {
					tasks: false,
				},
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
