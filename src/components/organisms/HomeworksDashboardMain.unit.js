import HomeworksDashboardMain from "./HomeworksDashboardMain";
import vCustomEmptyState from "@components/molecules/vCustomEmptyState";
import Vuetify from "vuetify";
import {
	overDueHomeworksTeacher,
	dueDateHomeworksTeacher,
	noDueDateHomeworksTeacher,
	coursesOpen,
	coursesCompleted,
	coursesTeacher,
	openHomeworksWithDueDate,
	openHomeworksWithoutDueDate,
	overDueHomeworks,
	gradedHomeworks,
	submittedHomeworks,
} from "@@/stories/mockData/Homeworks";

describe("@components/organisms/HomeworksDashboardMain", () => {
	const getHomeworksDashboard = jest.fn();
	const setFilter = jest.fn();
	const mockStoreStudent = {
		homeworks: {
			getters: {
				getStatus: () => "completed",
				isListEmpty: () => false,
				isListFilled: () => true,
				getOpenHomeworksWithoutDueDate: () => openHomeworksWithoutDueDate,
				getOpenHomeworksWithDueDate: () => openHomeworksWithDueDate,
				getOverDueHomeworks: () => overDueHomeworks,
				getGradedHomeworks: () => gradedHomeworks,
				getSubmittedHomeworks: () => submittedHomeworks,
				hasOpenHomeworks: () => true,
				getCoursesOpen: () => coursesOpen,
				getCoursesCompleted: () => coursesCompleted,
				hasNoOpenHomeworks: () => false,
				hasNoCompletedHomeworks: () => false,
			},
			actions: {
				getHomeworksDashboard,
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
				isListEmpty: () => false,
				isListFilled: () => true,
				getOverDueHomeworksTeacher: () => overDueHomeworksTeacher,
				getCourses: () => coursesTeacher,
				getOpenHomeworksWithDueDateTeacher: () => dueDateHomeworksTeacher,
				getOpenHomeworksWithoutDueDateTeacher: () => noDueDateHomeworksTeacher,
				getCoursesOpen: () => coursesOpen,
				hasOpenHomeworks: () => true,
			},
			actions: {
				getHomeworksDashboard,
			},
		},
	};

	const mockStoreEmpty = {
		homeworks: {
			getters: {
				getStatus: () => "completed",
				isListEmpty: () => true,
				isListFilled: () => false,
				getOverDueHomeworks: () => [],
				getCourses: () => [],
				getOpenHomeworksWithDueDate: () => [],
				getOpenHomeworksWithoutDueDate: () => [],
			},
			actions: {
				getHomeworksDashboard,
			},
		},
	};

	const mockStoreEmptyOpen = {
		homeworks: {
			getters: {
				getOpenHomeworksWithoutDueDate: () => [],
				getOpenHomeworksWithDueDate: () => [],
				getStatus: () => "completed",
				getOverDueHomeworks: () => [],
				isListEmpty: () => false,
				isListFilled: () => true,
				getCoursesOpen: () => [],
				hasOpenHomeworks: () => false,
				getGradedHomeworks: () => gradedHomeworks,
				getSubmittedHomeworks: () => submittedHomeworks,
				hasNoOpenHomeworks: () => true,
				hasCompletedHomeworks: () => true,
				hasNoCompletedHomeworks: () => false,
			},
			actions: {
				getHomeworksDashboard,
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
				role: "student",
			},
		});

		const emptyStateTitle = wrapper.vm.$i18n.t(
			"pages.homeworks.student.emptyState.title"
		);
		const emptyStateSubtitle = wrapper.vm.$i18n.t(
			"pages.homeworks.student.emptyState.subtitle"
		);

		const fullText = `${emptyStateTitle} ${emptyStateSubtitle}`;

		expect(wrapper.text()).toBe(fullText);
		expect(wrapper.findComponent(vCustomEmptyState).exists()).toBe(true);
	});

	it("Should render correct title and subtitle for the empty state", () => {
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

		const emptyStateTitle = wrapper.vm.$i18n.t(
			"pages.homeworks.teacher.emptyState.title"
		);
		const emptyStateSubtitle = wrapper.vm.$i18n.t(
			"pages.homeworks.teacher.emptyState.subtitle"
		);

		const fullText = `${emptyStateTitle} ${emptyStateSubtitle}`;

		expect(wrapper.text()).toBe(fullText);
	});

	it("Should should trigger a store action", async () => {
		mockStoreStudent.homeworks.actions.getHomeworksDashboard.mockClear();

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
			mockStoreStudent.homeworks.actions.getHomeworksDashboard
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
		await autocompleteEl.vm.$emit("change");

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

		expect(wrapper.vm.availableCourses).toStrictEqual(coursesOpen);
		wrapper.setData({ tab: 1 });
		expect(wrapper.vm.availableCourses).toStrictEqual(coursesCompleted);
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
