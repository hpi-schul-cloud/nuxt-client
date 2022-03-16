import { shallowMount, Wrapper } from "@vue/test-utils";
import PocVuexPage from "@/pages/poc-vuex/index.vue";
import { provide } from "@nuxtjs/composition-api";
import TaskModule from "@/store/tasks";
import { taskFactory } from "@/store/task.filter.unit";
import { createModuleMocks } from "@/utils/mock-store-module";

describe("PocVuexPage", () => {
	let wrapper: Wrapper<Vue>;
	let taskModule: TaskModule;

	beforeEach(() => {
		taskModule = createModuleMocks(TaskModule, {
			getTasks: taskFactory.buildList(5),
		});

		wrapper = shallowMount(PocVuexPage, {
			setup() {
				provide("taskModule", taskModule);
			},
		});
	});

	it("should fetch all tasks initially", () => {
		expect(taskModule.fetchAllTasks).toBeCalled();
	});

	it("should display the number of tasks", () => {
		expect(wrapper.find(".task-count").text()).toEqual("5");
	});
});
