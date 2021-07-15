import vHomeworkItemTeacher from "./vHomeworkItemTeacher";
import { homeworksTeacher, homeworks } from "@@/stories/mockData/Homeworks";
import Vuetify from "vuetify";

describe("@components/molecules/vHomeworkItemTeacher", () => {
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
				homework: homeworksTeacher[0],
			},
		});

		const firstLink = wrapper.find("a");

		expect(firstLink.exists()).toBe(true);
		expect(firstLink.attributes().href).toBe(
			`/homework/${homeworksTeacher[0].id}#activetabid=submissions`
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
				homework: homeworksTeacher[0],
			},
		});

		expect(wrapper.find(".v-list-item__subtitle").html()).toMatchSnapshot();
	});

	it("Should render subtitle with course name and no due date for homeworks without due date", () => {
		const wrapper = mount(vHomeworkItemTeacher, {
			...createComponentMocks({
				i18n: true,
				vuetify: true,
			}),
			vuetify,
			propsData: {
				homework: homeworksTeacher[7],
			},
		});

		expect(wrapper.find(".v-list-item__subtitle").html()).toMatchSnapshot();
	});

	it("accepts valid homework props", () => {
		const { validator } = vHomeworkItemTeacher.props.homework;
		const validHomeworks = homeworksTeacher;

		validHomeworks.forEach((homework) => {
			expect(validator(homework)).toBe(true);
		});

		homeworks.forEach((homework) => {
			expect(validator(homework)).toBe(false);
		});
	});
});
