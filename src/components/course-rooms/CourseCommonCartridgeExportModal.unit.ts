import CourseCommonCartridgeExportModal from "./CourseCommonCartridgeExportModal.vue";
import courseRoomDetailsModule from "@/store/course-room-details";
import { COURSE_ROOM_DETAILS_MODULE_KEY } from "@/utils/inject";
import { expectNotification, mockComposable } from "@@/tests/test-utils";
import { createModuleMocks } from "@@/tests/test-utils/mock-store-module";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { useCommonCartridgeExport } from "@data-common-cartridge";
import { createTestingPinia } from "@pinia/testing";
import { mount } from "@vue/test-utils";
import { setActivePinia } from "pinia";
import { Mocked } from "vitest";
import { VDialog } from "vuetify/components";

vi.mock("@data-common-cartridge");
const useCommonCartridgeExportMock = vi.mocked(useCommonCartridgeExport);

describe("CourseCommonCartridgeExportModal", () => {
	let courseRoomDetailsModuleMock: courseRoomDetailsModule;
	let useCommonCartridgeExportMockReturn: Mocked<ReturnType<typeof useCommonCartridgeExport>>;

	beforeEach(() => {
		setActivePinia(createTestingPinia());

		useCommonCartridgeExportMockReturn = mockComposable(useCommonCartridgeExport, {
			startExport: vi.fn(),
			allowedVersions: ["1.1.0", "1.3.0"],
		});
		useCommonCartridgeExportMock.mockReturnValue(useCommonCartridgeExportMockReturn);
	});

	const setup = (isSuccess = true) => {
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

		const wrapper = mount(CourseCommonCartridgeExportModal, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
				provide: {
					[COURSE_ROOM_DETAILS_MODULE_KEY.valueOf()]: courseRoomDetailsModuleMock,
				},
			},
			props: {
				isOpen: true,
			},
		});
		return wrapper;
	};

	it("should render CourseCommonCartridgeExportModal component", () => {
		const wrapper = setup();
		expect(wrapper.exists()).toBe(true);
	});

	describe("when getIsExportModalOpen is true", () => {
		it("should open the Dialog", () => {
			const wrapper = setup();
			const dialog = wrapper.findComponent(VDialog);
			expect(dialog.props("modelValue")).toBe(true);
		});
	});

	describe("onCancel / onCloseDialog", () => {
		it("should close dialog when cancel button clicked", async () => {
			const wrapper = setup();
			const closeBtn = wrapper.findComponent('[data-testid="dialog-cancel-btn"]');
			await closeBtn.trigger("click");
			const emit = wrapper.emitted();
			expect(emit).toHaveProperty("update:isOpen");
			expect(emit["update:isOpen"]).toContainEqual([false]);
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
		it("should call startExport and close the dialog", async () => {
			const wrapper = setup();
			const nextBtn = wrapper.findComponent("[data-testid='dialog-next-btn']");
			await nextBtn.trigger("click");
			const exportBtn = wrapper.findComponent('[data-testid="dialog-export-btn"]');
			await exportBtn.trigger("click");

			expect(useCommonCartridgeExportMockReturn.startExport).toHaveBeenCalled();

			const emit = wrapper.emitted();
			expect(emit).toHaveProperty("update:isOpen");
			expect(emit["update:isOpen"]).toContainEqual([false]);
		});

		it("should show error notification on error", async () => {
			const wrapper = setup(false);
			const nextBtn = wrapper.findComponent("[data-testid='dialog-next-btn']");
			await nextBtn.trigger("click");
			const exportBtn = wrapper.findComponent('[data-testid="dialog-export-btn"]');
			await exportBtn.trigger("click");

			expect(useCommonCartridgeExportMockReturn.startExport).toHaveBeenCalled();
			expectNotification("error");
		});
	});

	describe("toggleAllTopics", () => {
		it("should start with true and change the value when click", async () => {
			const wrapper = setup();
			const nextBtn = wrapper.findComponent('[data-testid="dialog-next-btn"]');
			await nextBtn.trigger("click");

			const allTopics = wrapper.findComponent('[data-testid="all-topics-checkbox"]');

			expect(allTopics.findAll("input").some((input) => input.attributes("value") === "true")).toBe(true);

			await allTopics.trigger("click");

			expect(allTopics.findAll("input").some((input) => input.attributes("value") === "false")).toBe(false);
		});
	});

	describe("toggleAllTasks", () => {
		it("should start with true and change the value when click", async () => {
			const wrapper = setup();
			const nextBtn = wrapper.findComponent('[data-testid="dialog-next-btn"]');
			await nextBtn.trigger("click");

			const allTasks = wrapper.findComponent('[data-testid="all-tasks-checkbox"]');

			expect(allTasks.findAll("input").some((input) => input.attributes("value") === "true")).toBe(true);

			await allTasks.trigger("click");

			expect(allTasks.findAll("input").some((input) => input.attributes("value") === "false")).toBe(false);
		});
	});

	describe("toggleAllColumnBoards", () => {
		it("should start with true and change the value when click", async () => {
			const wrapper = setup();
			const nextBtn = wrapper.findComponent('[data-testid="dialog-next-btn"]');
			await nextBtn.trigger("click");

			const allColumnBoards = wrapper.findComponent('[data-testid="all-column-boards-checkbox"]');

			expect(allColumnBoards.findAll("input").some((input) => input.attributes("value") === "true")).toBe(true);

			await allColumnBoards.trigger("click");

			expect(allColumnBoards.findAll("input").some((input) => input.attributes("value") === "false")).toBe(false);
		});
	});
});
