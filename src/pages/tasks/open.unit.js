import dashboard from "./open";
import {
	homeworks,
	overDueHomeworks,
	openHomeworks,
} from "@@/stories/mockData/Homeworks";
import Vuetify from "vuetify";

describe("Homeworks/open", () => {
	const getHomeworksDashboard = jest.fn();
	const mockStore = {
		homeworks: {
			getters: {
				list: () => homeworks,
				loading: () => false,
				isListEmpty: () => false,
				isListFilled: () => true,
				getOpenHomeworks: () => openHomeworks,
				getOverDueHomeworks: () => overDueHomeworks,
			},
			state: () => ({
				list: homeworks,
				loading: {
					homeworks: false,
				},
			}),
			actions: {
				getHomeworksDashboard,
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
		const title = wrapper.vm.$i18n.t("pages.homeworks.student.title");
		expect(wrapper.vm.$metaInfo.title).toBe(title);
	});
});
