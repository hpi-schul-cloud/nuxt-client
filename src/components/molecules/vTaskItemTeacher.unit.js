import Vuetify from "vuetify";

import mocks from "@@/stories/mockData/Tasks";

import vTaskItemTeacher from "./vTaskItemTeacher";

const { tasksTeacher, drafts } = mocks;
const routerPushStub = { push: jest.fn() };

const getWrapper = (props, options) => {
	return mount(vTaskItemTeacher, {
		...createComponentMocks({
			i18n: true,
			vuetify: true,
			$router: routerPushStub,
		}),
		propsData: props,
		...options,
	});
};

describe("@components/molecules/vTaskItemTeacher", () => {
	let vuetify;

	beforeEach(() => {
		vuetify = new Vuetify();
	});

	it(...isValidComponent(vTaskItemTeacher));

	it("Should call onTaskItemClick() by click on v-list-item", async () => {
		const mockMethod = jest.spyOn(vTaskItemTeacher.methods, "onTaskItemClick");
		const wrapper = getWrapper({
			task: tasksTeacher[0],
		});

		await wrapper.find(".v-list-item").trigger("click");
		expect(mockMethod).toHaveBeenCalled();
	});

	it("Should call taskHref() and return link by click on v-list-item", async () => {
		const mockMethod = jest.spyOn(vTaskItemTeacher.methods, "taskHref");
		const wrapper = getWrapper({
			task: tasksTeacher[0],
		});

		await wrapper.find(".v-list-item").trigger("click");
		expect(mockMethod).toHaveReturnedWith(`/homework/${tasksTeacher[0].id}`);
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

	it.todo("missing complete coverage for coursename and topic");
});
