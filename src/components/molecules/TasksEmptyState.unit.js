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
			),
		});

		expect(wrapper.props().image).toBeDefined();
		expect(wrapper.props().title).toBeDefined();
		expect(wrapper.props().subtitle).toBeDefined();

		const title = "Test title";
		const subtitle = "Test subtitle";
		const image = "@assets/img/empty-state/Task_Empty_State.svg";

		wrapper.setProps({ image });
		wrapper.setProps({ title });
		wrapper.setProps({ subtitle });
		expect(wrapper.props().title).toBe(title);
		expect(wrapper.props().subtitle).toBe(subtitle);
		expect(wrapper.props().image).toBe(image);
	});
});
