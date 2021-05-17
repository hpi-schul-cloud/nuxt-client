import Vuetify from "vuetify";
import TasksEmptyState from "./TasksEmptyState";
import BaseImage from "@basecomponents/BaseImage";

describe("@components/organisms/HomeworksList", () => {

	let vuetify;

	beforeEach(() => {
		vuetify = new Vuetify();
	});

	it(...isValidComponent(TasksEmptyState));

	it("Should render a Base Image component", () => {
		const wrapper = mount(TasksEmptyState, {
			...createComponentMocks(
				{
					i18n: true,
					vuetify: true,
				},
				vuetify
			),
			propsData: {
				imageSrc: "@assets/img/empty-state/Task_Empty_State.svg",
				message: "Es gibt keine offenen Aufgaben",
				submessage: "Du hast alle Aufgaben erledigt. Genieße deine freie Zeit!"
			}
		});
		expect(wrapper.findComponent(BaseImage).exists()).toBe(true);
	});

});
