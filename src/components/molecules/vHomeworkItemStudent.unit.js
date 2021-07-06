import vHomeworkItemStudent from "./vHomeworkItemStudent";
import {
	homeworks,
	openHomeworksWithoutDueDate,
	overDueHomeworks,
	openHomeworksWithDueDate,
	invalidHomeworks,
} from "@@/stories/mockData/Homeworks";
import Vuetify from "vuetify";

describe("@components/molecules/vHomeworkItemStudent", () => {
	let vuetify;

	beforeEach(() => {
		vuetify = new Vuetify();
	});

	it(...isValidComponent(vHomeworkItemStudent));

	it("Should link list item links to homework/<id> page", () => {
		const wrapper = mount(vHomeworkItemStudent, {
			...createComponentMocks({
				i18n: true,
				vuetify: true,
			}),
			vuetify,
			propsData: {
				homework: homeworks[0],
			},
		});

		const firstLink = wrapper.find("a");

		expect(firstLink.exists()).toBe(true);
		expect(firstLink.attributes().href).toBe(`/homework/${homeworks[0]._id}`);
	});

	it("Should display no due date label if homework has no duedate", () => {
		const wrapper = mount(vHomeworkItemStudent, {
			...createComponentMocks({
				i18n: true,
				vuetify: true,
			}),
			vuetify,
			propsData: {
				homework: openHomeworksWithoutDueDate[0],
			},
		});

		const dueDateLabel = wrapper.find("[data-test-id='dueDateLabel']");
		expect(dueDateLabel.text()).toBe("Kein Abgabedatum");
	});

	it("Should display due date label if homework has duedate", () => {
		const wrapper = mount(vHomeworkItemStudent, {
			...createComponentMocks({
				i18n: true,
				vuetify: true,
			}),
			vuetify,
			propsData: {
				homework: homeworks[0],
			},
		});

		const dueDateLabel = wrapper.find("[data-test-id='dueDateLabel']");
		expect(dueDateLabel.text()).toBe("Abgabe 11.06.00 16:00");
	});

	it("Should render overdue label, if homework is overdue", () => {
		const wrapper = mount(vHomeworkItemStudent, {
			...createComponentMocks({
				i18n: true,
				vuetify: true,
			}),
			vuetify,
			propsData: {
				homework: overDueHomeworks[0],
			},
		});

		expect(wrapper.find("[data-test-id='overDueDateLabel']").exists()).toBe(
			true
		);
	});

	it("Should render hint label, if homework is close to due date", () => {
		const current = new Date();
		current.setHours(current.getHours() + 1);
		const closeToDueDate = current.toISOString();

		const homeworkCloseToDueDate = {
			id: "59cce2c61113d1132c98dc02",
			_id: "59cce2c61113d1132c98dc02",
			name: "Private Aufgabe von Marla - mit Kurs, abgelaufen",
			duedate: closeToDueDate,
			courseName: "Mathe",
			createdAt: "2017-09-28T11:49:39.924Z",
		};

		const wrapper = mount(vHomeworkItemStudent, {
			...createComponentMocks({
				i18n: true,
				vuetify: true,
			}),
			vuetify,
			propsData: {
				homework: homeworkCloseToDueDate,
			},
		});

		expect(wrapper.find("[data-test-id='dueDateHintLabel']").exists()).toBe(
			true
		);
	});

	it("Should render no hint/overdue label if the homework is due to in the far future", () => {
		const wrapper = mount(vHomeworkItemStudent, {
			...createComponentMocks({
				i18n: true,
				vuetify: true,
			}),
			vuetify,
			propsData: {
				homework: openHomeworksWithDueDate[0],
			},
		});

		expect(wrapper.find("[data-test-id='overDueDateLabel']").exists()).toBe(
			false
		);
		expect(wrapper.find("[data-test-id='dueDateHintLabel']").exists()).toBe(
			false
		);
	});

	it("computedDueDateLabel() method should be able to render a shortened date", () => {
		const wrapper = mount(vHomeworkItemStudent, {
			...createComponentMocks({
				i18n: true,
				vuetify: true,
			}),
			vuetify,
			propsData: {
				homework: openHomeworksWithDueDate[0],
			},
		});

		expect(
			wrapper.vm.computedDueDateLabel(openHomeworksWithDueDate[0].duedate)
		).toBe("Abgabe 11.06.00 16:00");

		expect(
			wrapper.vm.computedDueDateLabel(openHomeworksWithDueDate[0].duedate, true)
		).toBe("Abgabe 11.06.00");
	});

	it("accepts valid homework props", () => {
		const { validator } = vHomeworkItemStudent.props.homework;
		const validHomeworks = homeworks;

		validHomeworks.forEach((homework) => {
			expect(validator(homework)).toBe(true);
		});

		invalidHomeworks.forEach((homework) => {
			expect(validator(homework)).toBe(false);
		});
	});
});
