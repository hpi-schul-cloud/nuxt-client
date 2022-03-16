import { shallowMount, Wrapper } from "@vue/test-utils";
import FooBar from "@/pages/foobar/index.vue";
import { provide } from "@nuxtjs/composition-api";
import TaskModule from "@/store/tasks";
import { taskFactory } from "@/store/task.filter.unit";

describe("FooBar", () => {
	let wrapper: Wrapper<FooBar>;
	let taskModule: TaskModule;

	beforeEach(() => {
		taskModule = new TaskModule({});
		taskModule.tasks = taskFactory.buildList(5);

		wrapper = shallowMount(FooBar, {
			setup() {
				provide("taskModule", taskModule);
			},
		});
	});

	it("should inject the provided taskModule", () => {
		expect(wrapper.find(".task-count").text()).toEqual("5");
	});
});
