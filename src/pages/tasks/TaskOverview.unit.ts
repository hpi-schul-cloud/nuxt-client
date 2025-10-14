import TaskOverview from "./TaskOverview.page.vue";
import TasksDashboardMain from "@/components/templates/TasksDashboardMain.vue";
import { RoleName } from "@/serverApi/v3";
import { createTestAppStore } from "@@/tests/test-utils";
import { createTestingI18n } from "@@/tests/test-utils/setup";
import { createTestingPinia } from "@pinia/testing";
import { shallowMount } from "@vue/test-utils";
import { setActivePinia } from "pinia";

vi.mock(
	"@/utils/pageTitle",
	() =>
		({
			buildPageTitle: (pageTitle?: string, parentTitle?: string) =>
				[pageTitle, parentTitle, "dBildungscloud"].filter(Boolean).join(" - "),
		}) as typeof import("@/utils/pageTitle")
);

describe("TaskOverview", () => {
	const fetchAllTasksSpy = vi.fn();
	const getWrapper = (userRole?: RoleName) => {
		setActivePinia(createTestingPinia());
		createTestAppStore({
			me: { roles: userRole ? [{ id: "test-user", name: userRole }] : [] },
		});

		return shallowMount(TaskOverview, {
			global: {
				plugins: [createTestingI18n()],
				provide: {
					tasksModule: {
						fetchAllTasks: fetchAllTasksSpy,
					},
				},
			},
		});
	};

	beforeEach(() => {
		vi.resetAllMocks();
	});

	it("should create component", () => {
		const wrapper = getWrapper(RoleName.Teacher);
		expect(wrapper).toBeTruthy();
	});

	it("should set title to tasks", () => {
		getWrapper(RoleName.Superhero);
		expect(document.title).toBe(`common.words.tasks - dBildungscloud`);
	});

	it("should fetchAllTasks on mount", () => {
		getWrapper();
		expect(fetchAllTasksSpy).toHaveBeenCalledTimes(1);
	});

	it.each([RoleName.Teacher, RoleName.Student])("should render child component for %p", (userRole) => {
		const wrapper = getWrapper(userRole);
		const childComponent = wrapper.findComponent(TasksDashboardMain);
		expect(childComponent.exists()).toBeTruthy();
	});

	it("should not render child component for arbitrary roles", () => {
		const wrapper = getWrapper(RoleName.Superhero);
		const childComponent = wrapper.findComponent(TasksDashboardMain);
		expect(childComponent.exists()).toBeFalsy();
	});
});
