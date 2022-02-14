import { mount } from "@vue/test-utils";
import RoomLessonCardTeacher from "./RoomLessonCardTeacher.vue";

declare let createComponentMocks: Function;

const baseTestProps = {
	room: {
		roomId: "456",
		displayColor: "#54616e",
	},
	lesson: {
		id: "123",
		name: "Test Name",
		courseName: "Mathe",
		createdAt: "2017-09-28T11:58:46.601Z",
		updatedAt: "2017-09-28T11:58:46.601Z",
		hidden: false,
	},
	ariaLabel:
		"lesson, Link, Test Thema (Mathe) - zum Öffnen die Eingabetaste drücken",
};

const getWrapper: any = (props: object, options?: object) => {
	return mount(RoomLessonCardTeacher, {
		...createComponentMocks({
			i18n: true,
			vuetify: true,
		}),
		propsData: props,
		...options,
	});
};

describe("@components/molecules/RoomLessonCardTeacher", () => {
	beforeEach(() => {
		document.body.setAttribute("data-app", "true");
	});

	it("should have correct props", () => {
		const wrapper = getWrapper(baseTestProps);

		expect(wrapper.vm.ariaLabel).toStrictEqual(baseTestProps.ariaLabel);
		expect(wrapper.vm.lesson).toStrictEqual(baseTestProps.lesson);
		expect(wrapper.vm.room).toStrictEqual(baseTestProps.room);
	});

	it("lesson card should have correct 'href' value", () => {
		const wrapper = getWrapper(baseTestProps);
		const lessonCard = wrapper.find(".lesson-card");

		expect(lessonCard.element.href).toStrictEqual(
			"http://localhost/courses/456/topics/123"
		);
	});

	it("should have correct title", () => {
		const wrapper = getWrapper(baseTestProps);
		const title = wrapper.find(".title-section");

		expect(title.element.textContent).toContain("Test Name");
	});

	it("should have one action button if lesson is hidden with correct color", () => {
		const testProps = {
			room: {
				roomId: "456",
				displayColor: "#54616e",
			},
			lesson: {
				id: "123",
				name: "Test Name",
				courseName: "Mathe",
				createdAt: "2017-09-28T11:58:46.601Z",
				updatedAt: "2017-09-28T11:58:46.601Z",
				hidden: true,
			},
			ariaLabel:
				"lesson, Link, Test Thema (Mathe) - zum Öffnen die Eingabetaste drücken",
		};
		const wrapper = getWrapper(testProps);
		const actionButtons = wrapper.findAll(".action-button");

		expect(actionButtons).toHaveLength(1);
		expect(actionButtons.wrappers[0].vm._props.color).toContain("#54616e");
	});

	it("should have no action button when lesson is visible", () => {
		const wrapper = getWrapper(baseTestProps);
		const actionButtons = wrapper.findAll(".action-button");

		expect(actionButtons).toHaveLength(0);
	});

	it("'more action' button should trigger the 'redirectAction' method", async () => {
		const redirectAction = jest.fn();
		const wrapper = getWrapper(baseTestProps);
		wrapper.vm.redirectAction = redirectAction;

		const threeDotButton = wrapper.find(".three-dot-button");
		await threeDotButton.trigger("click");

		const moreActionButton = wrapper.find(".task-action");
		await moreActionButton.trigger("click");

		expect(redirectAction).toHaveBeenCalled();
		expect(redirectAction.mock.calls[0][0]).toStrictEqual(
			"/courses/456/topics/123/edit"
		);
	});
});
