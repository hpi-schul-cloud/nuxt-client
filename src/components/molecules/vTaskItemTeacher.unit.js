import Vuetify from "vuetify";
import mocks from "@@/stories/mockData/Tasks";
import vTaskItemTeacher from "./vTaskItemTeacher";

const { tasksTeacher, drafts } = mocks;
const routerPushStub = { push: jest.fn() };

Object.defineProperty(window, "innerWidth", {
	writable: true,
	configurable: true,
	value: 1264,
});
window.dispatchEvent(new Event("resize"));

const getWrapper = (props, options) => {
	return mount(vTaskItemTeacher, {
		...createComponentMocks({
			i18n: true,
			vuetify: true,
			$router: routerPushStub,
		}),
		propsData: props,
		attachTo: document.body,
		...options,
	});
};

describe("@components/molecules/vTaskItemTeacher", () => {
	// eslint-disable-next-line no-unused-vars
	let vuetify; // TODO - figure this out

	beforeEach(() => {
		vuetify = new Vuetify();
	});

	it(...isValidComponent(vTaskItemTeacher));

	it("accepts valid task props", () => {
		const { validator } = vTaskItemTeacher.props.task;
		const validTasks = tasksTeacher;

		validTasks.forEach((task) => {
			expect(validator(task)).toBe(true);
		});
	});

	it("Should call taskHref() and return link by click on v-list-item", async () => {
		const mockMethod = jest.spyOn(vTaskItemTeacher.methods, "taskHref");
		const wrapper = getWrapper({
			task: tasksTeacher[0],
		});

		await wrapper.find(".v-list-item").trigger("click");
		expect(mockMethod).toHaveReturnedWith(`/homework/${tasksTeacher[0].id}`);
	});

	describe("course name", () => {
		it("Should render subtitle with course name and no due date for tasks without due date", () => {
			const wrapper = getWrapper({
				task: tasksTeacher[7],
			});

			expect(wrapper.find(".v-list-item__subtitle").html()).toMatchSnapshot();
		});

		it("Should render subtitle with no course name", () => {
			const wrapper = getWrapper({
				task: drafts[1],
			});

			expect(wrapper.find(".v-list-item__subtitle").html()).toMatchSnapshot();
		});

		it("Should render subtitle with course name and due date", () => {
			const wrapper = getWrapper({
				task: tasksTeacher[0],
			});

			expect(wrapper.find(".v-list-item__subtitle").html()).toMatchSnapshot();
		});
	});

	describe("topic", () => {
		it("should display topic", () => {
			const wrapper = getWrapper({
				task: drafts[1],
			});

			expect(wrapper.text()).toStrictEqual(
				expect.not.stringContaining("Thema ")
			);
		});

		it.todo("missing complete coverage for coursename and topic");
	});

	describe("when menu is used", () => {
		describe("mouse events", () => {
			it.todo("should show menu btn on hover");

			it("should open menu on btn click", async () => {
				const wrapper = getWrapper({
					task: drafts[1],
				});

				const menuBtn = wrapper.find(".v-btn");
				await menuBtn.trigger("click");

				expect(wrapper.vm.showMenu).toBe(true);
				expect(wrapper.vm.isMenuActive).toBe(true);
				expect(wrapper.find(".menuable__content__active").exists()).toBe(true);
			});

			it("should close menu on btn click", async () => {
				const wrapper = getWrapper({
					task: drafts[1],
				});

				const menuBtn = wrapper.find(".v-btn");
				await menuBtn.trigger("click");
				await menuBtn.trigger("click");

				expect(wrapper.vm.isMenuActive).toBe(false);
				expect(wrapper.find(".menuable__content__active").exists()).toBe(false);
			});

			it.todo("should close & hide menu on outside click");
		});

		describe("keyboard events", () => {
			it("should show menu btn on tab focus", async () => {
				const wrapper = getWrapper({
					task: drafts[1],
				});

				await wrapper.trigger("focus");
				expect(wrapper.vm.isActive).toBe(true);
				const menuBtn = wrapper.find("#task-menu-btn");
				expect(menuBtn.isVisible()).toBe(true);
			});
		});

		it("should link to btn edit page on edit btn click", async () => {
			const wrapper = getWrapper({
				task: tasksTeacher[0],
			});

			const menuBtn = wrapper.find(".v-btn");
			await menuBtn.trigger("click");
			const editBtn = wrapper.find(".task-action");

			expect(editBtn.attributes("href")).toBe(
				`/homework/${tasksTeacher[0].id}/edit`
			);
		});

		it("always show menu on mobile", () => {
			Object.defineProperty(window, "innerWidth", {
				writable: true,
				configurable: true,
				value: 375,
			});
			window.dispatchEvent(new Event("resize"));

			const wrapper = getWrapper({
				task: tasksTeacher[0],
			});

			const menuBtn = wrapper.find("#task-menu-btn");
			expect(menuBtn.isVisible()).toBe(true);
		});
	});
});
