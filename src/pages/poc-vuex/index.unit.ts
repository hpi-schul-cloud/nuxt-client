import PocVuexPage from "@/pages/poc-vuex/index.vue";
import { taskFactory } from "@/store/task.filter.unit";
import TaskModule from "@/store/tasks";
import { createModuleMocks } from "@/utils/mock-store-module";
import { provide } from "@nuxtjs/composition-api";
import { shallowMount } from "@vue/test-utils";

describe("PocVuexPage", () => {
	let taskModule: TaskModule;

	const mountComponent = () => {
		const wrapper = shallowMount(PocVuexPage, {
			setup() {
				provide("taskModule", taskModule);
			},
		});
		return wrapper;
	};

	beforeEach(() => {
		taskModule = createModuleMocks(TaskModule, {
			getTasks: taskFactory.buildList(5),
		});
	});

	it("should fetch all tasks initially", () => {
		mountComponent();
		expect(taskModule.fetchAllTasks).toBeCalled();
	});

	it("should display the number of tasks", () => {
		const wrapper = mountComponent();
		expect(wrapper.find(".task-count").text()).toEqual("5");
	});

	it("should call the getter", () => {
		const spy = jest.spyOn(taskModule, "getTasks", "get");
		const wrapper = mountComponent();
		expect(spy).toHaveBeenCalled();
	});
});
