import TaskOverview from "./TaskOverview.page.vue";
import Vuetify from "vuetify";
import { tasksModule } from "@/store";
import setupStores from "@@/tests/test-utils/setupStores";
import AuthModule from "@/store/auth";
import TasksModule from "@/store/tasks";
import FinishedTasksModule from "@/store/finished-tasks";

describe("TaskOverview", () => {
	let vuetify;

	beforeEach(() => {
		setupStores({
			auth: AuthModule,
			tasks: TasksModule,
			finishedTasks: FinishedTasksModule,
		});

		vuetify = new Vuetify();
	});

	it(...isValidComponent(TaskOverview));

	it("has correct page title set in <head>", () => {
		const wrapper = shallowMount(TaskOverview, {
			...createComponentMocks({
				i18n: true,
				vuetify: true,
				vueMeta: true,
			}),
			vuetify,
		});

		const title = wrapper.vm.$i18n.t("common.words.tasks");
		expect(wrapper.vm.$metaInfo.title).toBe(title);
	});

	it("Should should trigger fetschAllTasks", async () => {
		const spy = jest.spyOn(tasksModule, "fetchAllTasks");

		shallowMount(TaskOverview, {
			...createComponentMocks({
				i18n: true,
				vuetify: true,
				vueMeta: true,
			}),
			vuetify,
		});

		expect(spy).toHaveBeenCalled();
	});
});
