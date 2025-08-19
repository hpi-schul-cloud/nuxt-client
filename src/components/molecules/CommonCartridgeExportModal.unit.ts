import CommonCartridgeExportModal from "@/components/molecules/CommonCartridgeExportModal.vue";
import CommonCartridgeExportModule from "@/store/common-cartridge-export";
import NotifierModule from "@/store/notifier";
import courseRoomDetailsModule from "@/store/course-room-details";
import {
	COMMON_CARTRIDGE_EXPORT_MODULE_KEY,
	NOTIFIER_MODULE_KEY,
	COURSE_ROOM_DETAILS_MODULE_KEY,
} from "@/utils/inject";
import { createModuleMocks } from "@@/tests/test-utils/mock-store-module";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { mount } from "@vue/test-utils";
import { VDialog } from "vuetify/lib/components/index";

describe("@/components/molecules/CommonCartridgeExportModal", () => {
	let exportModuleMock: CommonCartridgeExportModule;
	let courseRoomDetailsModuleMock: courseRoomDetailsModule;
	let notifierMock: NotifierModule;

	const setup = (isSuccess = true) => {
		exportModuleMock = createModuleMocks(CommonCartridgeExportModule, {
			getIsExportModalOpen: true,
			getVersion: "1.1.0",
			getTopics: ["topic"],
			getTasks: ["task"],
			getColumnBoards: ["columnBoards"],
			startExport: vi.fn(),
			resetExportFlow: vi.fn(),
		});
		courseRoomDetailsModuleMock = createModuleMocks(courseRoomDetailsModule, {
			getRoomData: {
				roomId: "1",
				title: "title",
				displayColor: "color",
				elements: [],
				isArchived: false,
				isSynchronized: false,
			},
			getBusinessError: isSuccess
				? {
						message: "",
						statusCode: "",
					}
				: {
						message: "Error",
						statusCode: "500",
					},
		});
		notifierMock = createModuleMocks(NotifierModule);

		const wrapper = mount(CommonCartridgeExportModal, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
				provide: {
					[COMMON_CARTRIDGE_EXPORT_MODULE_KEY.valueOf()]: exportModuleMock,
					[NOTIFIER_MODULE_KEY.valueOf()]: notifierMock,
					[COURSE_ROOM_DETAILS_MODULE_KEY.valueOf()]:
						courseRoomDetailsModuleMock,
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

			exportModuleMock.startExport();

			expect(exportBtn.exists()).toBe(false);
			expect(exportModuleMock.startExport).toHaveBeenCalled();
		});

		it("should show error notification on error", async () => {
			const wrapper = setup(false);
			const nextBtn = wrapper.findComponent("[data-testid='dialog-next-btn']");
			await nextBtn.trigger("click");
			const exportBtn = wrapper.findComponent(
				'[data-testid="dialog-export-btn"]'
			);
			await exportBtn.trigger("click");
			const emit = wrapper.emitted();
			expect(emit).toHaveProperty("dialog-confirmed");
			expect(emit).toHaveProperty("dialog-closed");

			exportModuleMock.startExport();

			expect(exportBtn.exists()).toBe(false);
			expect(exportModuleMock.startExport).toHaveBeenCalled();
			expect(notifierMock.show).toHaveBeenCalledWith({
				status: "error",
				text: expect.any(String),
				autoClose: true,
			});
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

	describe("toggleAllColumnBoards", () => {
		it("should start with true and change the value when click", async () => {
			const wrapper = setup();
			const nextBtn = wrapper.findComponent('[data-testid="dialog-next-btn"]');
			await nextBtn.trigger("click");

			const allColumnBoards = wrapper.findComponent(
				'[data-testid="all-column-boards-checkbox"]'
			);

			expect(
				allColumnBoards
					.findAll("input")
					.some((input) => input.attributes("value") === "true")
			).toBe(true);

			await allColumnBoards.trigger("click");

			expect(
				allColumnBoards
					.findAll("input")
					.some((input) => input.attributes("value") === "false")
			).toBe(false);
		});
	});
});
