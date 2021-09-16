import dashboard from "./assigned";
import { homeworks } from "@@/stories/mockData/Homeworks";
import Vuetify from "vuetify";

describe("Homeworks/assigned", () => {
	const getAllHomeworks = jest.fn();
	const mockStore = {
		homeworks: {
			getters: {
				list: () => homeworks,
				loading: () => false,
				hasNoHomeworks: () => false,
				getCourses: () => [],
				hasCompletedHomeworks: () => true,
			},
			state: () => ({
				list: homeworks,
				loading: {
					homeworks: false,
				},
			}),
			actions: {
				getAllHomeworks,
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
		const title = wrapper.vm.$i18n.t("pages.homeworks.title");
		expect(wrapper.vm.$metaInfo.title).toBe(title);
	});
});
