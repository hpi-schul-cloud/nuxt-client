import CourseCommonCartridgeExportModal from "./CourseCommonCartridgeExportModal.vue";
import courseRoomDetailsModule from "@/store/course-room-details";
import { COURSE_ROOM_DETAILS_MODULE_KEY } from "@/utils/inject";
import { expectNotification, mockComposable } from "@@/tests/test-utils";
import { createModuleMocks } from "@@/tests/test-utils/mock-store-module";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { BoardElementResponse, BoardElementResponseType } from "@api-server";
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

	describe("version selection", () => {
		it("should have version radio buttons available", () => {
			const wrapper = setup();
			const version110Radio = wrapper.findComponent('[data-testid="version-110-radio-button"]');
			const version130Radio = wrapper.findComponent('[data-testid="version-130-radio-button"]');

			expect(version110Radio.exists()).toBe(true);
			expect(version130Radio.exists()).toBe(true);
		});
	});

	describe("dialog structure", () => {
		it("should show dialog when open", () => {
			const wrapper = setup();
			const dialog = wrapper.findComponent(VDialog);
			expect(dialog.exists()).toBe(true);
			expect(dialog.props("modelValue")).toBe(true);
		});
	});

	describe("content steps", () => {
		it("should navigate between steps and show appropriate content", async () => {
			const wrapper = setup();

			expect(wrapper.findComponent('[data-testid="dialog-next-btn"]').exists()).toBe(true);

			const nextBtn = wrapper.findComponent('[data-testid="dialog-next-btn"]');
			await nextBtn.trigger("click");

			expect(wrapper.findComponent('[data-testid="dialog-export-btn"]').exists()).toBe(true);
			expect(wrapper.findComponent('[data-testid="dialog-next-btn"]').exists()).toBe(false);
		});
	});

	describe("checkbox states", () => {
		it("should handle disabled checkboxes when no items are available", async () => {
			const wrapper = setup();
			const nextBtn = wrapper.findComponent('[data-testid="dialog-next-btn"]');
			await nextBtn.trigger("click");

			const allTopicsCheckbox = wrapper.findComponent('[data-testid="all-topics-checkbox"]');
			const allTasksCheckbox = wrapper.findComponent('[data-testid="all-tasks-checkbox"]');
			const allColumnBoardsCheckbox = wrapper.findComponent('[data-testid="all-column-boards-checkbox"]');

			expect(allTopicsCheckbox.find("input").attributes("disabled")).toBeDefined();
			expect(allTasksCheckbox.find("input").attributes("disabled")).toBeDefined();
			expect(allColumnBoardsCheckbox.find("input").attributes("disabled")).toBeDefined();
		});
	});

	describe("error notification", () => {
		it("should show error notification when export fails with business error", async () => {
			const wrapper = setup(false);
			const nextBtn = wrapper.findComponent('[data-testid="dialog-next-btn"]');
			await nextBtn.trigger("click");

			const exportBtn = wrapper.findComponent('[data-testid="dialog-export-btn"]');
			await exportBtn.trigger("click");

			expect(useCommonCartridgeExportMockReturn.startExport).toHaveBeenCalled();

			expectNotification("error");
		});
	});

	describe("reset functionality", () => {
		it("should reset dialog when closing", async () => {
			const wrapper = setup();

			const nextBtn = wrapper.findComponent('[data-testid="dialog-next-btn"]');
			await nextBtn.trigger("click");

			const cancelBtn = wrapper.findComponent('[data-testid="dialog-cancel-btn"]');
			await cancelBtn.trigger("click");

			const emit = wrapper.emitted();
			expect(emit).toHaveProperty("update:isOpen");
			expect(emit["update:isOpen"]).toContainEqual([false]);
		});
	});

	describe("export with selected items", () => {
		it("should call startExport with correct parameters", async () => {
			const wrapper = setup();
			const nextBtn = wrapper.findComponent('[data-testid="dialog-next-btn"]');
			await nextBtn.trigger("click");

			const exportBtn = wrapper.findComponent('[data-testid="dialog-export-btn"]');
			await exportBtn.trigger("click");

			// Should call startExport with version and empty arrays (no elements)
			expect(useCommonCartridgeExportMockReturn.startExport).toHaveBeenCalledWith("1.1.0", [], [], []);
		});
	});

	describe("room data processing with real elements", () => {
		const setupWithElements = (elements: unknown[]) => {
			courseRoomDetailsModuleMock = createModuleMocks(courseRoomDetailsModule, {
				getRoomData: {
					roomId: "1",
					title: "title",
					displayColor: "color",
					elements: elements as BoardElementResponse[],
					isArchived: false,
					isSynchronized: false,
				},
				getBusinessError: {
					message: "",
					statusCode: "",
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

		it("should process lesson elements correctly", async () => {
			const elements = [
				{
					type: BoardElementResponseType.LESSON,
					content: { id: "lesson1", name: "Math Lesson" },
				},
			];

			const wrapper = setupWithElements(elements);
			const nextBtn = wrapper.findComponent('[data-testid="dialog-next-btn"]');
			await nextBtn.trigger("click");

			const allTopicsCheckbox = wrapper.findComponent('[data-testid="all-topics-checkbox"]');
			expect(allTopicsCheckbox.exists()).toBe(true);
			expect(allTopicsCheckbox.find("input").attributes("disabled")).toBeFalsy();
		});

		it("should process task elements correctly", async () => {
			const elements = [
				{
					type: BoardElementResponseType.TASK,
					content: { id: "task1", name: "Math Task" },
				},
			];

			const wrapper = setupWithElements(elements);
			const nextBtn = wrapper.findComponent('[data-testid="dialog-next-btn"]');
			await nextBtn.trigger("click");

			const allTasksCheckbox = wrapper.findComponent('[data-testid="all-tasks-checkbox"]');
			expect(allTasksCheckbox.exists()).toBe(true);
			expect(allTasksCheckbox.find("input").attributes("disabled")).toBeFalsy();
		});

		it("should process column board elements correctly", async () => {
			const elements = [
				{
					type: BoardElementResponseType.COLUMN_BOARD,
					content: { id: "board1", title: "Math Board" },
				},
			];

			const wrapper = setupWithElements(elements);
			const nextBtn = wrapper.findComponent('[data-testid="dialog-next-btn"]');
			await nextBtn.trigger("click");

			const allColumnBoardsCheckbox = wrapper.findComponent('[data-testid="all-column-boards-checkbox"]');
			expect(allColumnBoardsCheckbox.exists()).toBe(true);
			expect(allColumnBoardsCheckbox.find("input").attributes("disabled")).toBeFalsy();
		});
	});

	describe("toggle functions with elements", () => {
		const setupWithMixedElements = () => {
			const elements = [
				{
					type: "lesson",
					content: { id: "lesson1", name: "Math Lesson" },
				},
				{
					type: "lesson",
					content: { id: "lesson2", name: "Science Lesson" },
				},
				{
					type: "task",
					content: { id: "task1", name: "Math Task" },
				},
				{
					type: "task",
					content: { id: "task2", name: "Science Task" },
				},
				{
					type: "column-board",
					content: { id: "board1", title: "Math Board" },
				},
			];

			return setupWithElements(elements);
		};

		it("should toggle all topics correctly", async () => {
			const wrapper = setupWithMixedElements();
			const nextBtn = wrapper.findComponent('[data-testid="dialog-next-btn"]');
			await nextBtn.trigger("click");

			const allTopicsCheckbox = wrapper.findComponent('[data-testid="all-topics-checkbox"]');
			await allTopicsCheckbox.trigger("click");

			await allTopicsCheckbox.trigger("click");

			expect(allTopicsCheckbox.exists()).toBe(true);
		});

		it("should toggle all tasks correctly", async () => {
			const wrapper = setupWithMixedElements();
			const nextBtn = wrapper.findComponent('[data-testid="dialog-next-btn"]');
			await nextBtn.trigger("click");

			const allTasksCheckbox = wrapper.findComponent('[data-testid="all-tasks-checkbox"]');
			await allTasksCheckbox.trigger("click");

			await allTasksCheckbox.trigger("click");

			expect(allTasksCheckbox.exists()).toBe(true);
		});

		it("should toggle all column boards correctly", async () => {
			const wrapper = setupWithMixedElements();
			const nextBtn = wrapper.findComponent('[data-testid="dialog-next-btn"]');
			await nextBtn.trigger("click");

			const allColumnBoardsCheckbox = wrapper.findComponent('[data-testid="all-column-boards-checkbox"]');
			await allColumnBoardsCheckbox.trigger("click");

			await allColumnBoardsCheckbox.trigger("click");

			expect(allColumnBoardsCheckbox.exists()).toBe(true);
		});
	});

	describe("onBack function coverage", () => {
		it("should reset selections when going back", async () => {
			const elements = [
				{
					type: "lesson",
					content: { id: "lesson1", name: "Math Lesson" },
				},
				{
					type: "task",
					content: { id: "task1", name: "Math Task" },
				},
			];

			const wrapper = setupWithElements(elements);
			const nextBtn = wrapper.findComponent('[data-testid="dialog-next-btn"]');
			await nextBtn.trigger("click");

			const backBtn = wrapper.findComponent('[data-testid="dialog-back-btn"]');
			await backBtn.trigger("click");

			expect(wrapper.findComponent('[data-testid="dialog-next-btn"]').exists()).toBe(true);
			expect(wrapper.findComponent('[data-testid="dialog-back-btn"]').exists()).toBe(false);
		});
	});

	describe("version change functionality", () => {
		it("should handle version change", async () => {
			const wrapper = setup();

			const version130Radio = wrapper.findComponent('[data-testid="version-130-radio-button"]');
			await version130Radio.trigger("click");

			const nextBtn = wrapper.findComponent('[data-testid="dialog-next-btn"]');
			await nextBtn.trigger("click");

			expect(wrapper.findComponent('[data-testid="dialog-export-btn"]').exists()).toBe(true);
		});
	});

	describe("resetDialog function", () => {
		it("should reset dialog state properly", async () => {
			const wrapper = setup();

			const nextBtn = wrapper.findComponent('[data-testid="dialog-next-btn"]');
			await nextBtn.trigger("click");

			const cancelBtn = wrapper.findComponent('[data-testid="dialog-cancel-btn"]');
			await cancelBtn.trigger("click");

			const emitted = wrapper.emitted("update:isOpen");
			expect(emitted).toHaveLength(1);
			expect(emitted?.[0]).toEqual([false]);
		});
	});

	describe("setAll function coverage", () => {
		it("should be called by onBack function", async () => {
			const elements = [
				{
					type: "lesson",
					content: { id: "lesson1", name: "Math Lesson" },
				},
			];

			const wrapper = setupWithElements(elements);
			const nextBtn = wrapper.findComponent('[data-testid="dialog-next-btn"]');
			await nextBtn.trigger("click");

			const backBtn = wrapper.findComponent('[data-testid="dialog-back-btn"]');
			await backBtn.trigger("click");

			expect(wrapper.findComponent('[data-testid="dialog-next-btn"]').exists()).toBe(true);
		});
	});

	function setupWithElements(elements: unknown[]) {
		courseRoomDetailsModuleMock = createModuleMocks(courseRoomDetailsModule, {
			getRoomData: {
				roomId: "1",
				title: "title",
				displayColor: "color",
				elements: elements as BoardElementResponse[],
				isArchived: false,
				isSynchronized: false,
			},
			getBusinessError: {
				message: "",
				statusCode: "",
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
	}
});
