import dashboard from "./index";
import Vuetify from "vuetify";
import { taskModule } from "@/store";
import setupStores from "@@/tests/test-utils/setupStores";
import AuthModule from "@/store/auth";
import TaskModule from "@/store/tasks";
import FinishedTaskModule from "@/store/finished-tasks";

describe("Tasks/index", () => {
	let vuetify;

	beforeEach(() => {
		setupStores({
			auth: AuthModule,
			tasks: TaskModule,
			finishedTasks: FinishedTaskModule,
		});

		vuetify = new Vuetify();
	});

	it(...isValidComponent(dashboard));

	it("has correct page title set in <head>", () => {
		const wrapper = shallowMount(dashboard, {
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

		shallowMount(dashboard, {
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
