import { mount } from "@vue/test-utils";
import RoomTaskCardStudent from "./RoomTaskCardStudent.vue";

declare let createComponentMocks: Function;

const baseTestProps = {
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
		const wrapper = getWrapper(baseTestProps);

		expect(wrapper.vm.task).toStrictEqual(baseTestProps.task);
		expect(wrapper.vm.ariaLabel).toStrictEqual(baseTestProps.ariaLabel);
	});

	it("task card should have correct 'href' value", () => {
		const wrapper = getWrapper(baseTestProps);
		const taskCard = wrapper.find(".task-card");

		expect(taskCard.element.href).toStrictEqual(
			"http://localhost/homework/123"
		);
	});

	it("should have correct combined title", () => {
		const wrapper = getWrapper(baseTestProps);
		const title = wrapper.find(".title-section");

		expect(title.element.textContent).toContain("Aufgabe - Abgabe - 28.09.00");
	});

	it("should have no status area when task is finished", () => {
		const testProps = {
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
		const wrapper = getWrapper(testProps);
		const statusSection = wrapper.findAll(".chip-items-group");

		expect(statusSection).toHaveLength(0);
	});

	// is skipped until decided in next iterations
	it.skip("should have submitted visual when task submitted but not graded", () => {
		const testProps = {
			task: {
				id: "123",
				name: "Test Name",
				createdAt: "2017-09-28T11:58:46.601Z",
				updatedAt: "2017-09-28T11:58:46.601Z",
				status: {
					isFinished: false,
					submitted: 1,
					graded: 0,
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
		const wrapper = getWrapper(testProps);
		const taskStateName = wrapper.find(".chip-value");

		expect(taskStateName.element.textContent).toContain("$taskDone");
	});

	// is skipped until decided in next iterations
	it.skip("should have graded visual when task submitted and graded", () => {
		const testProps = {
			task: {
				id: "123",
				name: "Test Name",
				createdAt: "2017-09-28T11:58:46.601Z",
				updatedAt: "2017-09-28T11:58:46.601Z",
				status: {
					isFinished: false,
					submitted: 1,
					graded: 1,
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
		const wrapper = getWrapper(testProps);
		const taskStateName = wrapper.find(".chip-value");

		expect(taskStateName.element.textContent).toContain("$taskDoneFilled");
	});

	// is skipped until decided in next iterations
	it.skip("should have overdue visual when task duedate is in the past and no submittion was done", () => {
		const testProps = {
			task: {
				id: "123",
				name: "Test Name",
				createdAt: "2017-09-28T11:58:46.601Z",
				updatedAt: "2017-09-28T11:58:46.601Z",
				status: {
					isFinished: false,
					submitted: 0,
					graded: 0,
				},
				courseName: "Mathe",
				availableDate: "2017-09-28T08:00:00.000Z",
				duedate: "2018-09-28T11:58:46.601Z",
				displayColor: "#54616e",
				description: "some description here",
			},
			ariaLabel:
				"task, Link, Aufgabe an Marla (Mathe) - offen, zum Öffnen die Eingabetaste drücken",
		};
		const wrapper = getWrapper(testProps);
		const taskStateName = wrapper.find(".chip-value");

		expect(taskStateName.element.textContent).toContain("$taskMissed");
	});

	// is skipped until decided in next iterations
	it.skip("should have open visual when task was not worked on yet", () => {
		const testProps = {
			task: {
				id: "123",
				name: "Test Name",
				createdAt: "2017-09-28T11:58:46.601Z",
				updatedAt: "2017-09-28T11:58:46.601Z",
				status: {
					isFinished: false,
					submitted: 0,
					graded: 0,
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
		const wrapper = getWrapper(testProps);
		const taskStateName = wrapper.find(".chip-value");

		expect(taskStateName.element.textContent).toContain("$taskOpenFilled");
	});

	it("should have restore button if task is finished", () => {
		const testProps = {
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
		const wrapper = getWrapper(testProps);
		const actionButtons = wrapper.findAll(".action-button");

		expect(actionButtons).toHaveLength(1);
		expect(actionButtons.wrappers[0].element.textContent).toContain(
			"Aufgabe wiederherstellen"
		);
	});

	it("should have finish button if task is not marked as finished", () => {
		const wrapper = getWrapper(baseTestProps);
		const actionButtons = wrapper.findAll(".action-button");

		expect(actionButtons).toHaveLength(1);
		expect(actionButtons.wrappers[0].element.textContent).toContain(
			"Abschließen"
		);
	});
});
