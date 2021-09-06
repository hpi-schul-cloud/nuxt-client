import HomeworksDashboardMain from "./HomeworksDashboardMain";
import vCustomEmptyState from "@components/molecules/vCustomEmptyState";
import Vuetify from "vuetify";
import {
	overDueHomeworksTeacher,
	dueDateHomeworksTeacher,
	noDueDateHomeworksTeacher,
	courses,
	coursesTeacher,
	openHomeworksWithDueDate,
	openHomeworksWithoutDueDate,
	overDueHomeworks,
	gradedHomeworks,
	submittedHomeworks,
} from "@@/stories/mockData/Homeworks";

describe("@components/organisms/HomeworksDashboardMain", () => {
	const getAllHomeworks = jest.fn();
	const setFilter = jest.fn();
	const mockStoreStudent = {
		homeworks: {
			getters: {
				getStatus: () => "completed",
				hasNoHomeworks: () => false,
				getOpenHomeworksForStudent: () => ({
					overdue: overDueHomeworks,
					withDueDate: openHomeworksWithDueDate,
					noDueDate: openHomeworksWithoutDueDate,
				}),
				getCompletedHomeworksForStudent: () => ({
					submitted: submittedHomeworks,
					graded: gradedHomeworks,
				}),
				getCourses: () => courses,
				hasNoOpenHomeworks: () => false,
				hasNoCompletedHomeworks: () => false,
			},
			actions: {
				getAllHomeworks,
			},
			mutations: {
				setFilter,
			},
		},
	};

	const mockStoreTeacher = {
		homeworks: {
			getters: {
				getStatus: () => "completed",
				hasNoHomeworks: () => false,
				getOpenHomeworksForTeacher: () => ({
					overdue: overDueHomeworksTeacher,
					withDueDate: dueDateHomeworksTeacher,
					noDueDate: noDueDateHomeworksTeacher,
				}),
				getCourses: () => coursesTeacher,
				hasNoOpenHomeworks: () => false,
			},
			actions: {
				getAllHomeworks,
			},
		},
	};

	const mockStoreEmpty = {
		homeworks: {
			getters: {
				getStatus: () => "completed",
				hasNoHomeworks: () => true,
				getOpenHomeworksForTeacher: () => ({
					overdue: [],
					withDueDate: [],
					noDueDate: [],
				}),
				getCourses: () => [],
			},
			actions: {
				getAllHomeworks,
			},
		},
	};

	const mockStoreEmptyOpen = {
		homeworks: {
			getters: {
				getStatus: () => "completed",
				getOpenHomeworksForStudent: () => ({
					overdue: [],
					noDueDate: [],
					withDueDate: [],
				}),
				getCompletedHomeworksForStudent: () => ({
					submitted: submittedHomeworks,
					graded: gradedHomeworks,
				}),
				hasNoOpenHomeworks: () => true,
				hasNoCompletedHomeworks: () => false,
				hasNoHomeworks: () => false,
				getCourses: () => courses,
			},
			actions: {
				getAllHomeworks,
			},
		},
	};
	let vuetify;

	beforeEach(() => {
		vuetify = new Vuetify();
	});

	it(...isValidComponent(HomeworksDashboardMain));

	it("Should render empty state, if there are no homeworks", () => {
		const wrapper = mount(HomeworksDashboardMain, {
			...createComponentMocks({
				i18n: true,
				vuetify: true,
				store: mockStoreEmpty,
			}),
			vuetify,
			propsData: {
				role: "teacher",
			},
		});

		expect(wrapper.findComponent(vCustomEmptyState).exists()).toBe(true);
	});

	it("Should should trigger a store action", async () => {
		mockStoreStudent.homeworks.actions.getAllHomeworks.mockClear();

		shallowMount(HomeworksDashboardMain, {
			...createComponentMocks({
				i18n: true,
				vuetify: true,
				store: mockStoreStudent,
			}),
			vuetify,
			propsData: {
				role: "student",
			},
		});

		expect(
			mockStoreStudent.homeworks.actions.getAllHomeworks
		).toHaveBeenCalled();
	});

	it("Should render student's homeworks dashboard for a student", () => {
		const wrapper = mount(HomeworksDashboardMain, {
			...createComponentMocks({
				i18n: true,
				vuetify: true,
				store: mockStoreStudent,
			}),
			vuetify,
			propsData: {
				role: "student",
			},
		});

		expect(wrapper.find(".homework-dashboard-student").exists()).toBe(true);
		expect(wrapper.find(".homework-dashboard-teacher").exists()).toBe(false);
	});

	it("Should render teacher's homeworks dashboard for a teacher", () => {
		const wrapper = mount(HomeworksDashboardMain, {
			...createComponentMocks({
				i18n: true,
				vuetify: true,
				store: mockStoreTeacher,
			}),
			vuetify,
			propsData: {
				role: "teacher",
			},
		});

		expect(wrapper.find(".homework-dashboard-teacher").exists()).toBe(true);
		expect(wrapper.find(".homework-dashboard-student").exists()).toBe(false);
	});

	it("Should receive valid role props", () => {
		const validRoles = ["student", "teacher"];
		const invalidRoles = ["janitor", "principal"];
		const { validator } = HomeworksDashboardMain.props.role;

		validRoles.forEach((role) => {
			expect(validator(role)).toBe(true);
		});
		invalidRoles.forEach((role) => {
			expect(validator(role)).toBe(false);
		});
	});

	it("Should render v-autocomplete component", () => {
		const wrapper = mount(HomeworksDashboardMain, {
			...createComponentMocks({
				i18n: true,
				vuetify: true,
				store: mockStoreTeacher,
			}),
			vuetify,
			propsData: {
				role: "teacher",
			},
		});

		const autocompleteEl = wrapper.find(".v-autocomplete");
		expect(autocompleteEl.exists()).toBe(true);
	});

	it("Should call 'filterByCourse' method with v-autocomplete on change", async () => {
		const mockMethod = jest.spyOn(
			HomeworksDashboardMain.methods,
			"filterByCourse"
		);
		const wrapper = await mount(HomeworksDashboardMain, {
			...createComponentMocks({
				i18n: true,
				vuetify: true,
				store: mockStoreStudent,
			}),
			vuetify,
			propsData: {
				role: "student",
			},
		});

		const autocompleteEl = wrapper.find(".v-autocomplete");
		await autocompleteEl.vm.$emit("selected-item");

		expect(mockMethod).toHaveBeenCalled();
	});

	it("Should set available courses based on the active tab", () => {
		const wrapper = mount(HomeworksDashboardMain, {
			...createComponentMocks({
				i18n: true,
				vuetify: true,
				store: mockStoreStudent,
			}),
			vuetify,
			data() {
				return {
					tab: 0,
				};
			},
			propsData: {
				role: "student",
			},
		});

		expect(wrapper.vm.availableCourses).toStrictEqual(courses);
		wrapper.setData({ tab: 1 });
		expect(wrapper.vm.availableCourses).toStrictEqual(courses);
	});

	it("Should disable filter when active tab contains empty list", () => {
		const wrapper = mount(HomeworksDashboardMain, {
			...createComponentMocks({
				i18n: true,
				vuetify: true,
				store: mockStoreEmptyOpen,
			}),
			vuetify,
			data() {
				return {
					tab: 0,
				};
			},
			propsData: {
				role: "student",
			},
		});

		expect(wrapper.vm.isFilterDisabled).toBe(true);
		wrapper.setData({ tab: 1 });
		expect(wrapper.vm.isFilterDisabled).toBe(false);
	});
});
