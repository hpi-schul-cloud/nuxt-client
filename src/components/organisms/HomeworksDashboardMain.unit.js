import HomeworksDashboardMain from "./HomeworksDashboardMain";
import vCustomEmptyState from "@components/molecules/vCustomEmptyState";
import Vuetify from "vuetify";
import {
	homeworks,
	overDueHomeworks,
	homeworksTeacher,
} from "@@/stories/mockData/Homeworks";

describe("@components/organisms/HomeworksDashboardMain", () => {
	const getHomeworksDashboard = jest.fn();
	const mockStoreStudent = {
		homeworks: {
			getters: {
				loading: () => false,
				isListEmpty: () => false,
				isListFilled: () => true,
				getOpenHomeworks: () => homeworks,
				getOverDueHomeworks: () => overDueHomeworks,
			},
			actions: {
				getHomeworksDashboard,
			},
		},
	};

	const mockStoreTeacher = {
		homeworks: {
			getters: {
				loading: () => false,
				isListEmpty: () => false,
				isListFilled: () => true,
				getOpenHomeworks: () => homeworksTeacher,
				getOverDueHomeworks: () => overDueHomeworksTeacher,
			},
			actions: {
				getHomeworksDashboard,
			},
		},
	};

	const mockStoreEmpty = {
		homeworks: {
			getters: {
				loading: () => false,
				isListEmpty: () => true,
				isListFilled: () => false,
				getOpenHomeworks: () => [],
				getOverDueHomeworks: () => [],
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
});
