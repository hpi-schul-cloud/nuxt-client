import TaskOverview from "./TaskOverview.page.vue";
import Vuetify from "vuetify";
import { taskModule } from "@/store";
import setupStores from "@@/tests/test-utils/setupStores";
import AuthModule from "@/store/auth";
import TaskModule from "@/store/tasks";
import FinishedTaskModule from "@/store/finished-tasks";

describe("TaskOverview", () => {
	let vuetify;

	beforeEach(() => {
		setupStores({
			auth: AuthModule,
			tasks: TaskModule,
			finishedTasks: FinishedTaskModule,
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
		const spy = jest.spyOn(taskModule, "fetchAllTasks");

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
