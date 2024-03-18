import CommonCartridgeExportModule from "@/store/common-cartridge-export";
import NotifierModule from "@/store/notifier";
import RoomsModule from "@/store/rooms";
import {
	COMMON_CARTRIDGE_EXPORT_MODULE_KEY,
	NOTIFIER_MODULE_KEY,
	ROOM_MODULE_KEY,
} from "@/utils/inject";
import { createModuleMocks } from "@/utils/mock-store-module";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { mount } from "@vue/test-utils";
import { VDialog } from "vuetify/lib/components/index.mjs";
import CommonCartridgeExportModal from "@/components/molecules/CommonCartridgeExportModal.vue";

describe("@/components/molecules/CommonCartridgeExportModal", () => {
	let exportModuleMock: CommonCartridgeExportModule;
	const setup = () => {
		exportModuleMock = createModuleMocks(CommonCartridgeExportModule, {
			getIsExportModalOpen: true,
			getVersion: "1.1.0",
			startExport: jest.fn(),
			resetExportFlow: jest.fn(),
		});
		const wrapper = mount(CommonCartridgeExportModal, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
				provide: {
					[COMMON_CARTRIDGE_EXPORT_MODULE_KEY.valueOf()]: exportModuleMock,
					[NOTIFIER_MODULE_KEY.valueOf()]: createModuleMocks(NotifierModule),
					[ROOM_MODULE_KEY.valueOf()]: createModuleMocks(RoomsModule),
				},
			},
		});
		return wrapper;
	};

	it("should render CommonCartridgeExportModal component", () => {
		const wrapper = setup();
		expect(wrapper.exists()).toBe(true);
	});

	describe("when getIsExportModalOpen is true", () => {
		it("should open the Dialog", async () => {
			const wrapper = setup();
			const dialog = wrapper.findComponent(VDialog);
			expect(dialog.props("modelValue")).toBe(true);
		});
	});

	describe("onCancel / onCloseDialog", () => {
		it("should close dialog when cancel button clicked", async () => {
			const wrapper = setup();
			const closeBtn = wrapper.findComponent(
				'[data-testid="dialog-cancel-btn"]'
			);
			await closeBtn.trigger("click");
			const emit = wrapper.emitted();
			expect(emit).toHaveProperty("dialog-closed");
		});
	});

	describe("onNext", () => {
		it("should move to step 2 Dialog and have export button", async () => {
			const wrapper = setup();
			const nextBtn = wrapper.findComponent("[data-testid='dialog-next-btn']");
			await nextBtn.trigger("click");
			const emit = wrapper.findComponent("[data-testid='dialog-export-btn']");

			expect(emit.exists()).toBe(true);
		});
	});

	describe("onBack", () => {
		it("should move to step 1 and have next button", async () => {
			const wrapper = setup();
			const nextBtn = wrapper.findComponent("[data-testid='dialog-next-btn']");
			await nextBtn.trigger("click");
			const backBtn = wrapper.findComponent("[data-testid='dialog-back-btn']");
			await backBtn.trigger("click");
			const emit = wrapper.findComponent("[data-testid='dialog-next-btn']");

			expect(emit.exists()).toBe(true);
		});
	});

	describe("onExport", () => {
		it("should call startExport and confirm then close the dialog", async () => {
			const wrapper = setup();
			const nextBtn = wrapper.findComponent("[data-testid='dialog-next-btn']");
			await nextBtn.trigger("click");
			const exportBtn = wrapper.findComponent(
				'[data-testid="dialog-export-btn"]'
			);
			await exportBtn.trigger("click");
			const emit = wrapper.emitted();
			expect(emit).toHaveProperty("dialog-confirmed");
			expect(emit).toHaveProperty("dialog-closed");

			exportModuleMock.startExport("1.1.0");

			expect(exportBtn.exists()).toBe(false);
			expect(exportModuleMock.startExport).toHaveBeenCalled();
		});
	});

	describe("toggleAllTopics", () => {
		it("should start with true and change the value when click", async () => {
			const wrapper = setup();
			const nextBtn = wrapper.findComponent('[data-testid="dialog-next-btn"]');
			await nextBtn.trigger("click");

			const allTopics = wrapper.findComponent(
				'[data-testid="all-topics-checkbox"]'
			);
			expect(
				allTopics
					.findAll("input")
					.some((input) => input.attributes("value") === "true")
			).toBe(true);

			await allTopics.trigger("click");
			expect(
				allTopics
					.findAll("input")
					.some((input) => input.attributes("value") === "false")
			).toBe(false);
		});
	});

	describe("toggleAllTasks", () => {
		it("should start with true and change the value when click", async () => {
			const wrapper = setup();
			const nextBtn = wrapper.findComponent('[data-testid="dialog-next-btn"]');
			await nextBtn.trigger("click");

			const allTasks = wrapper.findComponent(
				'[data-testid="all-tasks-checkbox"]'
			);
			expect(
				allTasks
					.findAll("input")
					.some((input) => input.attributes("value") === "true")
			).toBe(true);

			await allTasks.trigger("click");
			expect(
				allTasks
					.findAll("input")
					.some((input) => input.attributes("value") === "false")
			).toBe(false);
		});
	});
});
