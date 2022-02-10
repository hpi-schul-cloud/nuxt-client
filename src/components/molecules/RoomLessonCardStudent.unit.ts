import { mount } from "@vue/test-utils";
import RoomLessonCardStudent from "./RoomLessonCardStudent.vue";

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
	return mount(RoomLessonCardStudent, {
		...createComponentMocks({
			i18n: true,
			vuetify: true,
		}),
		propsData: props,
		...options,
	});
};

describe("@components/molecules/RoomLessonCardStudent", () => {
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

	it("should have no action button", () => {
		const wrapper = getWrapper(baseTestProps);
		const actionButtons = wrapper.findAll(".action-button");

		expect(actionButtons).toHaveLength(0);
	});
});
