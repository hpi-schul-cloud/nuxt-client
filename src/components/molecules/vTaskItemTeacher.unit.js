import Vuetify from "vuetify";

import mocks from "@@/stories/mockData/Tasks";

import vTaskItemTeacher from "./vTaskItemTeacher";

const { tasksTeacher, drafts } = mocks;

describe("@components/molecules/vTaskItemTeacher", () => {
	let vuetify;

	beforeEach(() => {
		vuetify = new Vuetify();
	});

	it(...isValidComponent(vTaskItemTeacher));

	it("Should link list item links to task/<id>#activetabid=submissions grading page", () => {
		const wrapper = mount(vTaskItemTeacher, {
			...createComponentMocks({
				i18n: true,
				vuetify: true,
			}),
			vuetify,
			propsData: {
				task: tasksTeacher[0],
			},
		});

		const firstLink = wrapper.find("a");

		expect(firstLink.exists()).toBe(true);
		expect(firstLink.attributes().href).toBe(
			`/homework/${tasksTeacher[0].id}#activetabid=submissions`
		);
	});

	it("Should render subtitle with course name and due date", () => {
		const wrapper = mount(vTaskItemTeacher, {
			...createComponentMocks({
				i18n: true,
				vuetify: true,
			}),
			vuetify,
			propsData: {
				task: tasksTeacher[0],
			},
		});

		expect(wrapper.find(".v-list-item__subtitle").html()).toMatchSnapshot();
	});

	it("Should render subtitle with course name and no due date for tasks without due date", () => {
		const wrapper = mount(vTaskItemTeacher, {
			...createComponentMocks({
				i18n: true,
				vuetify: true,
			}),
			vuetify,
			propsData: {
				task: tasksTeacher[7],
			},
		});

		expect(wrapper.find(".v-list-item__subtitle").html()).toMatchSnapshot();
	});

	it("Should render subtitle with no course name", () => {
		const wrapper = mount(vTaskItemTeacher, {
			...createComponentMocks({
				i18n: true,
				vuetify: true,
			}),
			vuetify,
			propsData: {
				task: drafts[1],
			},
		});

		expect(wrapper.find(".v-list-item__subtitle").html()).toMatchSnapshot();
	});

	it("accepts valid task props", () => {
		const { validator } = vTaskItemTeacher.props.task;
		const validTasks = tasksTeacher;

		validTasks.forEach((task) => {
			expect(validator(task)).toBe(true);
		});
	});

	it("should display topic", () => {
		const wrapper = mount(vTaskItemTeacher, {
			...createComponentMocks({
				i18n: true,
				vuetify: true,
			}),
			vuetify,
			propsData: {
				task: drafts[1],
			},
		});

		expect(wrapper.text()).toStrictEqual(expect.not.stringContaining("Thema "));
	});
});
