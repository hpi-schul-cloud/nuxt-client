import { mount } from "@vue/test-utils";
import RoomTaskCardStudent from "./RoomTaskCardStudent.vue";

declare var createComponentMocks: Function;

const testProps = {
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
			isFinished: false,
		},
		courseName: "Mathe",
		availableDate: "2017-09-28T08:00:00.000Z",
		duedate: "2300-09-28T15:00:00.000Z",
		displayColor: "#54616e",
		description: "some description here",
	},
	ariaLabel:
		"task, Link, Aufgabe an Marla (Mathe) - offen, zum Öffnen die Eingabetaste drücken",
};

const getWrapper: any = (props: object, options?: object) => {
	return mount(RoomTaskCardStudent, {
		...createComponentMocks({
			i18n: true,
			vuetify: true,
		}),
		propsData: props,
		...options,
	});
};

describe("@components/molecules/RoomTaskCardStudent", () => {
	beforeEach(() => {
		document.body.setAttribute("data-app", "true");
	});

	it("should have correct props", () => {
		const wrapper = getWrapper(testProps);

		expect(wrapper.vm.task).toStrictEqual(testProps.task);
		expect(wrapper.vm.ariaLabel).toStrictEqual(testProps.ariaLabel);
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

		expect(title.element.textContent).toContain("Aufgabe - Abgabe - 28.09.00");
	});

	it("should have done button if task is not finished", () => {
		const draftTestProps = {
			task: {
				id: "123",
				name: "Test Name",
				createdAt: "2017-09-28T11:58:46.601Z",
				updatedAt: "2017-09-28T11:58:46.601Z",
				status: {
					isFinished: false,
				},
				courseName: "Mathe",
				availableDate: "2017-09-28T08:00:00.000Z",
				duedate: "2300-09-28T15:00:00.000Z",
				displayColor: "#54616e",
				description: "some description here",
			},
			ariaLabel:
				"task, Link, Aufgabe an Marla (Mathe) - offen, zum Öffnen die Eingabetaste drücken",
		};
		const wrapper = getWrapper(draftTestProps);
		const doneAction = wrapper.findAll(".action-done");

		expect(doneAction).toHaveLength(1);
	});

	it("should have restore button if task is finished", () => {
		const draftTestProps = {
			task: {
				id: "123",
				name: "Test Name",
				createdAt: "2017-09-28T11:58:46.601Z",
				updatedAt: "2017-09-28T11:58:46.601Z",
				status: {
					isFinished: true,
				},
				courseName: "Mathe",
				availableDate: "2017-09-28T08:00:00.000Z",
				duedate: "2300-09-28T15:00:00.000Z",
				displayColor: "#54616e",
				description: "some description here",
			},
			ariaLabel:
				"task, Link, Aufgabe an Marla (Mathe) - abgeschlossen, zum Öffnen die Eingabetaste drücken",
		};
		const wrapper = getWrapper(draftTestProps);
		const restoreAction = wrapper.findAll(".action-reopen");

		expect(restoreAction).toHaveLength(1);
	});
});
