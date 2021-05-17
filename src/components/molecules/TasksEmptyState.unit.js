import Vuetify from "vuetify";
import TasksEmptyState from "./TasksEmptyState";

describe("@components/organisms/HomeworksList", () => {

	let vuetify;

	beforeEach(() => {
		vuetify = new Vuetify();
	});

	it(...isValidComponent(TasksEmptyState));

	it("Should receive props", () => {
		const wrapper = mount(TasksEmptyState, {
			...createComponentMocks(
				{
					i18n: true,
					vuetify: true,
				},
				vuetify
			)
		});

		expect(wrapper.props().image).toBeDefined();
	});

});
