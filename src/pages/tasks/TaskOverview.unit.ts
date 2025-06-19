import TaskOverview from "./TaskOverview.page.vue";
import { shallowMount } from "@vue/test-utils";
import TasksDashboardMain from "@/components/templates/TasksDashboardMain.vue";
import { AUTH_MODULE_KEY } from "@/utils/inject";
import EnvConfigModule from "@/store/env-config";
import setupStores from "@@/tests/test-utils/setupStores";
import { createTestingI18n } from "@@/tests/test-utils/setup";

vi.mock<typeof import("@/utils/pageTitle")>("@/utils/pageTitle", () => ({
	buildPageTitle: (pageTitle) => pageTitle ?? "",
}));

describe("TaskOverview", () => {
	const fetchAllTasksSpy = vi.fn();
	const getWrapper = (userRole: string) => {
		return shallowMount(TaskOverview, {
			global: {
				plugins: [createTestingI18n()],
				provide: {
					[AUTH_MODULE_KEY.valueOf()]: {
						getUserRoles: [userRole],
					},
					tasksModule: {
						fetchAllTasks: fetchAllTasksSpy,
					},
				},
			},
		});
	};

	beforeEach(() => {
		vi.resetAllMocks();
		setupStores({
			envConfigModule: EnvConfigModule,
		});
	});

	it("should create component", () => {
		const wrapper = getWrapper("teacher");
		expect(wrapper).toBeTruthy();
	});

	it("should set title to tasks", () => {
		getWrapper("userRole");
		expect(document.title).toBe(`common.words.tasks`);
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
