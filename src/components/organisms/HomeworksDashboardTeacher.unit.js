import HomeworksDashboardTeacher from "./HomeworksDashboardTeacher";
import HomeworksList from "./HomeworksList";
import {
	homeworksTeacher,
	overDueHomeworksTeacher,
	courses,
	dueDateHomeworksTeacher,
	noDueDateHomeworksTeacher,
} from "@@/stories/mockData/Homeworks";
import Vuetify from "vuetify";

describe("@components/organisms/HomeworksDashboardTeacher", () => {
	const mockStore = {
		homeworks: {
			actions: {
				updateFilter: () => jest.fn(),
			},
			getters: {
				getOpenHomeworks: () => homeworksTeacher,
				loading: () => false,
				getCourses: () => courses,
				getOverDueHomeworks: () => overDueHomeworksTeacher,
				isListFilled: () => true,
				getOpenHomeworksWithDueDate: () => dueDateHomeworksTeacher,
				getOpenHomeworksWithoutDueDate: () => noDueDateHomeworksTeacher,
			},
		},
	};

	let vuetify;

	beforeEach(() => {
		vuetify = new Vuetify();
	});

	it(...isValidComponent(HomeworksDashboardTeacher));

	it("Should render homeworks list component", () => {
		const wrapper = mount(HomeworksDashboardTeacher, {
			...createComponentMocks({
				i18n: true,
				vuetify: true,
				store: mockStore,
			}),
			vuetify,
		});

		expect(wrapper.findComponent(HomeworksList).exists()).toBe(true);
	});

	it("Should call 'filterByCourse' method with v-autocomplete on change", async () => {
		const mockMethod = jest.spyOn(
			HomeworksDashboardTeacher.methods,
			"filterByCourse"
		);
		const wrapper = await mount(HomeworksDashboardTeacher, {
			...createComponentMocks({
				i18n: true,
				vuetify: true,
				store: mockStore,
			}),
			vuetify,
		});

		const autocompleteEl = wrapper.find(".v-autocomplete");
		await autocompleteEl.vm.$emit("change");

		expect(mockMethod).toHaveBeenCalled();
	});
});
