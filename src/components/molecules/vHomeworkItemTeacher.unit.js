import vHomeworkItemTeacher from "./vHomeworkItemTeacher";
import {
	homeworks,
	openHomeworksWithoutDueDate,
} from "@@/stories/mockData/Homeworks";
import Vuetify from "vuetify";

describe("@components/organisms/HomeworksList", () => {
	let vuetify;

	beforeEach(() => {
		vuetify = new Vuetify();
	});

	it(...isValidComponent(vHomeworkItemTeacher));

	it("Should link list item links to homework/<id>#activetabid=submissions grading page", () => {
		const wrapper = mount(vHomeworkItemTeacher, {
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
		expect(firstLink.attributes().href).toBe(
			`/homework/${homeworks[0]._id}#activetabid=submissions`
		);
	});

	it("Should render subtitle with course name and due date", () => {
		const wrapper = mount(vHomeworkItemTeacher, {
			...createComponentMocks({
				i18n: true,
				vuetify: true,
			}),
			vuetify,
			propsData: {
				homework: homeworks[0],
			},
		});

		expect(wrapper.find(".v-list-item__subtitle").text()).toBe(
			"Mathe – Abgabe 11.06.00"
		);
	});

	it("Should render subtitle with course name and no due date for homeworks without due date", () => {
		const wrapper = mount(vHomeworkItemTeacher, {
			...createComponentMocks({
				i18n: true,
				vuetify: true,
			}),
			vuetify,
			propsData: {
				homework: openHomeworksWithoutDueDate[0],
			},
		});

		expect(wrapper.find(".v-list-item__subtitle").text()).toBe(
			"Mathe – Kein Abgabedatum"
		);
	});
});
