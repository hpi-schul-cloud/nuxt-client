import NotifierModule from "@/store/notifier";
import { NOTIFIER_MODULE_KEY } from "@/utils/inject";
import { createModuleMocks } from "@/utils/mock-store-module";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { mount } from "@vue/test-utils";
import EndCourseSyncDialog from "./EndCourseSyncDialog.vue";

describe("EndCourseSyncDialog", () => {
	const getWrapper = () => {
		const notifierModule = createModuleMocks(NotifierModule);

		const wrapper = mount(EndCourseSyncDialog, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
				provide: {
					[NOTIFIER_MODULE_KEY.valueOf()]: notifierModule,
				},
			},
			props: {
				isOpen: true,
				courseName: "testCourseName",
				groupName: "testGroupName",
			},
		});

		return {
			wrapper,
			notifierModule,
		};
	};

	afterEach(() => {
		jest.resetAllMocks();
	});

	describe("when clicking on cancel", () => {
		it("should close the dialog", async () => {
			const { wrapper } = getWrapper();

			const cancelBtn = wrapper.findComponent("[data-testid=dialog-cancel]");
			await cancelBtn.trigger("click");

			expect(wrapper.vm.isOpen).toEqual(false);
			expect(wrapper.emitted("update:isOpen")).toBeDefined();
		});
	});

	describe("when clicking on confirm", () => {
		it("should close the dialog", async () => {
			const { wrapper } = getWrapper();

			const confirmBtn = wrapper.findComponent("[data-testid=dialog-confirm]");
			await confirmBtn.trigger("click");

			expect(wrapper.vm.isOpen).toEqual(false);
			expect(wrapper.emitted("update:isOpen")).toBeDefined();
		});

		it.skip("should call the api", async () => {
			const { wrapper } = getWrapper();

			const confirmBtn = wrapper.findComponent("[data-testid=dialog-confirm]");
			await confirmBtn.trigger("click");

			// TODO

			expect(wrapper).toEqual(false);
		});

		it("should show a notification", async () => {
			const { wrapper, notifierModule } = getWrapper();

			const confirmBtn = wrapper.findComponent("[data-testid=dialog-confirm]");
			await confirmBtn.trigger("click");

			expect(notifierModule.show).toHaveBeenCalledWith({
				text: "feature-course-sync.EndCourseSyncDialog.success",
				status: "success",
			});
		});
	});
});
