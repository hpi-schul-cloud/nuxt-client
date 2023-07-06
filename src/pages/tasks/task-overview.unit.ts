import TaskOverview from "./TaskOverview.page.vue";
import { shallowMount } from "@vue/test-utils";
import TasksDashboardMain from "@/components/templates/TasksDashboardMain.vue";
import { AUTH_MODULE, I18N_KEY } from "@/utils/inject";

describe("TaskOverview", () => {
	const fetchAllTasksSpy = jest.fn();
	const getWrapper = (userRole: string) => {
		return shallowMount(TaskOverview, {
			provide: {
				[I18N_KEY as symbol]: { t: (key: string) => key },
				[AUTH_MODULE.valueOf()]: {
					getUserRoles: [userRole],
				},
				tasksModule: {
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
