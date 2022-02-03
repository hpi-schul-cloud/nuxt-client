import { mount } from "@vue/test-utils";
import RoomTaskCardTeacher from "./RoomTaskCardTeacher.vue";

declare var createComponentMocks: Function;

const testProps = {
	actions: [
		{ icon: "taskFinish", to: "some.url here", name: "Finish" },
		{ icon: "taskDelete", to: "some.url here", name: "Delete" },
		{ icon: "Copy", to: "some.url here", name: "Copy" },
	],
	task: {
		id: "123",
		name: "Test Name",
		createdAt: "2017-09-28T11:58:46.601Z",
		updatedAt: "2017-09-28T11:58:46.601Z",
		status: {
			submitted: 0,
			maxSubmissions: 1,
			graded: 0,
			isDraft: false,
			isSubstitutionTeacher: false,
		},
		courseName: "Mathe",
		availableDate: "2017-09-28T08:00:00.000Z",
		duedate: "2300-09-28T15:00:00.000Z",
		displayColor: "#54616e",
		description: "some description here",
	},
	ariaLabel:
		"task, Link, Aufgabe an Marla (Mathe) - offen, zum Öffnen die Eingabetaste drücken",
	type: "task",
};

const getWrapper: any = (props: object, options?: object) => {
	return mount(RoomTaskCardTeacher, {
		...createComponentMocks({
			i18n: true,
			vuetify: true,
		}),
		propsData: props,
		...options,
	});
};

describe("@components/molecules/RoomTaskCardTeacher", () => {
	beforeEach(() => {
		document.body.setAttribute("data-app", "true");
	});

	it("should have correct props", () => {
		const wrapper = getWrapper(testProps);

		expect(wrapper.vm.actions).toStrictEqual(testProps.actions);
		expect(wrapper.vm.task).toStrictEqual(testProps.task);
		expect(wrapper.vm.ariaLabel).toStrictEqual(testProps.ariaLabel);
		expect(wrapper.vm.type).toStrictEqual(testProps.type);
	});

	it("task card should have correct 'href' value", () => {
		const wrapper = getWrapper(testProps);
		const taskCard = wrapper.find(".task-card");

		expect(taskCard.element.href).toStrictEqual(
			"http://localhost/homework/123"
		);
	});

	it("should have correct combined title", () => {
		const wrapper = getWrapper(testProps);
		const title = wrapper.find(".title-section");

		expect(title.element.textContent).toStrictEqual(
			"Aufgabe - Abgabe - 28.09.00"
		);
	});

	it("should have submitted and graded section if task is not a draft", () => {
		const draftTestProps = {
			actions: [],
			task: {
				id: "123",
				name: "Test Name",
				createdAt: "2017-09-28T11:58:46.601Z",
				updatedAt: "2017-09-28T11:58:46.601Z",
				status: {
					isDraft: true,
				},
				courseName: "Mathe",
				availableDate: "2017-09-28T08:00:00.000Z",
				duedate: "2300-09-28T15:00:00.000Z",
				displayColor: "#54616e",
				description: "some description here",
			},
			ariaLabel:
				"task, Link, Aufgabe an Marla (Mathe) - offen, zum Öffnen die Eingabetaste drücken",
			type: "task",
		};
		const wrapper = getWrapper(draftTestProps);
		const submitSection = wrapper.findAll(".chip-value");

		expect(submitSection).toHaveLength(0);
	});

	it("should have submitted and graded section if task is not a draft", () => {
		const wrapper = getWrapper(testProps);
		const submitSection = wrapper.findAll(".chip-value");

		expect(submitSection).toHaveLength(2);
		expect(submitSection.wrappers[0].element.textContent).toContain("0/1");
		expect(submitSection.wrappers[1].element.textContent).toContain("0/1");
	});

	it("should have 3 action button", () => {
		const wrapper = getWrapper(testProps);
		const actionButtons = wrapper.findAll(".action-button");

		expect(actionButtons).toHaveLength(3);
		expect(actionButtons.wrappers[0].element.textContent).toContain("Finish");
		expect(actionButtons.wrappers[1].element.textContent).toContain("Delete");
		expect(actionButtons.wrappers[2].element.textContent).toContain("Copy");
	});
});
