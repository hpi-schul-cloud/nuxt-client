import TaskOverview from "./TaskOverview.page.vue";
import { shallowMount } from "@vue/test-utils";
import TasksDashboardMain from "@/components/templates/TasksDashboardMain.vue";

describe("TaskOverview", () => {
	const fetchAllTasksSpy = jest.fn();
	const getWrapper = (userRole: string) => {
		return shallowMount(TaskOverview, {
			provide: {
				i18n: { t: (key: string) => key },
				authModule: {
					getUserRoles: [userRole],
				},
				tasksModule: {
					// eslint-disable-next-line @typescript-eslint/no-empty-function
					fetchAllTasks: fetchAllTasksSpy,
				},
			},
		});
	};

	beforeEach(() => {
		jest.resetAllMocks();
	});

	it("should create component", () => {
		const wrapper = getWrapper("teacher");
		expect(wrapper).toBeTruthy();
	});

	it("should set title to tasks", () => {
		getWrapper("userRole");
		expect(document.title).toBe("common.words.tasks");
	});

	it("should fetchAllTasks on mount", () => {
		getWrapper("");
		expect(fetchAllTasksSpy).toHaveBeenCalledTimes(1);
	});

	it.each(["teacher", "student"])(
		"should render child component for %p",
		(userRole) => {
			const wrapper = getWrapper(userRole);
			const childComponent = wrapper.findComponent(TasksDashboardMain);
			expect(childComponent.exists()).toBeTruthy();
		}
	);

	it("should not render child component for arbitrary roles", () => {
		const wrapper = getWrapper("arbitraryRole");
		const childComponent = wrapper.findComponent(TasksDashboardMain);
		expect(childComponent.exists()).toBeFalsy();
	});
});
