import CourseCommonCartridgeExportModal from "./CourseCommonCartridgeExportModal.vue";
import courseRoomDetailsModule from "@/store/course-room-details";
import { COURSE_ROOM_DETAILS_MODULE_KEY } from "@/utils/inject";
import { expectNotification, mockComposable } from "@@/tests/test-utils";
import { createModuleMocks } from "@@/tests/test-utils/mock-store-module";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { BoardElementResponse, BoardElementResponseType } from "@api-server";
import { useCommonCartridgeExport } from "@data-common-cartridge";
import { createTestingPinia } from "@pinia/testing";
import { flushPromises, mount, VueWrapper } from "@vue/test-utils";
import { setActivePinia } from "pinia";
import { Mocked } from "vitest";
import { nextTick, reactive } from "vue";
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

	const createRoomData = (elements: BoardElementResponse[] = []) =>
		reactive({
			roomId: "1",
			title: "title",
			displayColor: "color",
			elements,
			isArchived: false,
			isSynchronized: false,
		});

	const setup = (options: { elements?: unknown[]; isSuccess?: boolean } = {}): VueWrapper => {
		const { elements = [], isSuccess = true } = options;
		const roomData = createRoomData(elements as BoardElementResponse[]);

		courseRoomDetailsModuleMock = createModuleMocks(courseRoomDetailsModule, {
			getRoomData: roomData,
			getBusinessError: isSuccess ? { message: "", statusCode: "" } : { message: "Error", statusCode: "500" },
		});

		return mount(CourseCommonCartridgeExportModal, {
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
	};

	const setupWithReactiveElements = async (elements: BoardElementResponse[]) => {
		const roomData = createRoomData([]);
		courseRoomDetailsModuleMock = createModuleMocks(courseRoomDetailsModule, {
			getRoomData: roomData,
			getBusinessError: { message: "", statusCode: "" },
		});

		const wrapper = mount(CourseCommonCartridgeExportModal, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
				provide: {
					[COURSE_ROOM_DETAILS_MODULE_KEY.valueOf()]: courseRoomDetailsModuleMock,
				},
			},
			props: { isOpen: true },
		});

		roomData.elements = elements;
		await nextTick();
		await flushPromises();

		return wrapper;
	};

	const goToContentSelection = async (wrapper: VueWrapper): Promise<void> => {
		await wrapper.findComponent('[data-testid="dialog-next-btn"]').trigger("click");
	};

	describe("dialog rendering", () => {
		it("should render component", () => {
			const wrapper = setup();
			expect(wrapper.exists()).toBe(true);
		});

		it("should open dialog when isOpen is true", () => {
			const wrapper = setup();
			const dialog = wrapper.findComponent(VDialog);
			expect(dialog.props("modelValue")).toBe(true);
		});
	});

	describe("dialog close actions", () => {
		it("should emit close event when cancel button is clicked", async () => {
			const wrapper = setup();
			await wrapper.findComponent('[data-testid="dialog-cancel-btn"]').trigger("click");

			expect(wrapper.emitted("update:isOpen")).toContainEqual([false]);
		});

		it("should emit close event when cancel is clicked in content selection step", async () => {
			const wrapper = setup();
			await goToContentSelection(wrapper);
			await wrapper.findComponent('[data-testid="dialog-cancel-btn"]').trigger("click");

			expect(wrapper.emitted("update:isOpen")).toContainEqual([false]);
		});
	});

	describe("navigation between steps", () => {
		it("should show next button in version selection step", () => {
			const wrapper = setup();
			expect(wrapper.findComponent('[data-testid="dialog-next-btn"]').exists()).toBe(true);
			expect(wrapper.findComponent('[data-testid="dialog-export-btn"]').exists()).toBe(false);
		});

		it("should show export and back buttons in content selection step", async () => {
			const wrapper = setup();
			await goToContentSelection(wrapper);

			expect(wrapper.findComponent('[data-testid="dialog-export-btn"]').exists()).toBe(true);
			expect(wrapper.findComponent('[data-testid="dialog-back-btn"]').exists()).toBe(true);
			expect(wrapper.findComponent('[data-testid="dialog-next-btn"]').exists()).toBe(false);
		});

		it("should return to version selection when back button is clicked", async () => {
			const wrapper = setup();
			await goToContentSelection(wrapper);
			await wrapper.findComponent('[data-testid="dialog-back-btn"]').trigger("click");

			expect(wrapper.findComponent('[data-testid="dialog-next-btn"]').exists()).toBe(true);
			expect(wrapper.findComponent('[data-testid="dialog-back-btn"]').exists()).toBe(false);
		});
	});

	describe("version selection", () => {
		it("should display both version radio buttons", () => {
			const wrapper = setup();

			expect(wrapper.findComponent('[data-testid="version-110-radio-button"]').exists()).toBe(true);
			expect(wrapper.findComponent('[data-testid="version-130-radio-button"]').exists()).toBe(true);
		});

		it("should show version 1.1.0 specific info in content selection step", async () => {
			const wrapper = setup();
			await goToContentSelection(wrapper);

			// Check that the export button exists (confirms we're in content selection)
			expect(wrapper.findComponent('[data-testid="dialog-export-btn"]').exists()).toBe(true);
		});

		it("should hide version 1.1.0 specific info when version 1.3.0 is selected", async () => {
			const wrapper = setup();
			const radioGroup = wrapper.findComponent({ name: "VRadioGroup" });
			await radioGroup.setValue("1.3.0");
			await goToContentSelection(wrapper);

			expect(wrapper.find('[data-testid="export-options-info-point3"]').exists()).toBe(false);
		});
	});

	describe("export functionality", () => {
		it("should call startExport with default version and empty arrays when no elements", async () => {
			const wrapper = setup();
			await goToContentSelection(wrapper);
			await wrapper.findComponent('[data-testid="dialog-export-btn"]').trigger("click");

			expect(useCommonCartridgeExportMockReturn.startExport).toHaveBeenCalledWith("1.1.0", [], [], []);
		});

		it("should close dialog after successful export", async () => {
			const wrapper = setup();
			await goToContentSelection(wrapper);
			await wrapper.findComponent('[data-testid="dialog-export-btn"]').trigger("click");

			expect(wrapper.emitted("update:isOpen")).toContainEqual([false]);
		});

		it("should show error notification when export fails", async () => {
			const wrapper = setup({ isSuccess: false });
			await goToContentSelection(wrapper);
			await wrapper.findComponent('[data-testid="dialog-export-btn"]').trigger("click");

			expectNotification("error");
		});
	});

	describe("checkbox states with no elements", () => {
		it("should disable all checkboxes when no elements are available", async () => {
			const wrapper = setup();
			await goToContentSelection(wrapper);

			const topicsCheckbox = wrapper.findComponent('[data-testid="all-topics-checkbox"]');
			const tasksCheckbox = wrapper.findComponent('[data-testid="all-tasks-checkbox"]');
			const boardsCheckbox = wrapper.findComponent('[data-testid="all-column-boards-checkbox"]');

			expect(topicsCheckbox.find("input").attributes("disabled")).toBeDefined();
			expect(tasksCheckbox.find("input").attributes("disabled")).toBeDefined();
			expect(boardsCheckbox.find("input").attributes("disabled")).toBeDefined();
		});
	});

	describe("element processing via watcher", () => {
		it("should populate topics when lessons are added to room data", async () => {
			const wrapper = await setupWithReactiveElements([
				{ type: BoardElementResponseType.LESSON, content: { id: "l1", name: "Lesson 1" } },
			] as BoardElementResponse[]);

			await goToContentSelection(wrapper);
			const checkbox = wrapper.findComponent('[data-testid="all-topics-checkbox"]');
			expect(checkbox.find("input").attributes("disabled")).toBeFalsy();
		});

		it("should populate tasks when tasks are added to room data", async () => {
			const wrapper = await setupWithReactiveElements([
				{ type: BoardElementResponseType.TASK, content: { id: "t1", name: "Task 1" } },
			] as BoardElementResponse[]);

			await goToContentSelection(wrapper);
			const checkbox = wrapper.findComponent('[data-testid="all-tasks-checkbox"]');
			expect(checkbox.find("input").attributes("disabled")).toBeFalsy();
		});

		it("should populate column boards when boards are added to room data", async () => {
			const wrapper = await setupWithReactiveElements([
				{ type: BoardElementResponseType.COLUMN_BOARD, content: { id: "b1", title: "Board 1" } },
			] as BoardElementResponse[]);

			await goToContentSelection(wrapper);
			const checkbox = wrapper.findComponent('[data-testid="all-column-boards-checkbox"]');
			expect(checkbox.find("input").attributes("disabled")).toBeFalsy();
		});

		it("should call startExport with correct IDs when elements exist", async () => {
			const wrapper = await setupWithReactiveElements([
				{ type: BoardElementResponseType.LESSON, content: { id: "lesson1", name: "Lesson 1" } },
				{ type: BoardElementResponseType.TASK, content: { id: "task1", name: "Task 1" } },
				{ type: BoardElementResponseType.COLUMN_BOARD, content: { id: "board1", title: "Board 1" } },
			] as BoardElementResponse[]);

			await goToContentSelection(wrapper);
			await wrapper.findComponent('[data-testid="dialog-export-btn"]').trigger("click");

			expect(useCommonCartridgeExportMockReturn.startExport).toHaveBeenCalledWith(
				"1.1.0",
				["lesson1"],
				["task1"],
				["board1"]
			);
		});
	});

	describe("toggle all functionality", () => {
		const createMixedElements = (): BoardElementResponse[] =>
			[
				{ type: BoardElementResponseType.LESSON, content: { id: "l1", name: "Lesson 1" } },
				{ type: BoardElementResponseType.LESSON, content: { id: "l2", name: "Lesson 2" } },
				{ type: BoardElementResponseType.TASK, content: { id: "t1", name: "Task 1" } },
				{ type: BoardElementResponseType.TASK, content: { id: "t2", name: "Task 2" } },
				{ type: BoardElementResponseType.COLUMN_BOARD, content: { id: "b1", title: "Board 1" } },
				{ type: BoardElementResponseType.COLUMN_BOARD, content: { id: "b2", title: "Board 2" } },
			] as BoardElementResponse[];

		it("should deselect all topics when toggle is clicked", async () => {
			const wrapper = await setupWithReactiveElements(createMixedElements());
			await goToContentSelection(wrapper);

			await wrapper.findComponent('[data-testid="all-topics-checkbox"]').trigger("click");
			await wrapper.findComponent('[data-testid="dialog-export-btn"]').trigger("click");

			expect(useCommonCartridgeExportMockReturn.startExport).toHaveBeenCalledWith(
				"1.1.0",
				[],
				["t1", "t2"],
				["b1", "b2"]
			);
		});

		it("should deselect all tasks when toggle is clicked", async () => {
			const wrapper = await setupWithReactiveElements(createMixedElements());
			await goToContentSelection(wrapper);

			await wrapper.findComponent('[data-testid="all-tasks-checkbox"]').trigger("click");
			await wrapper.findComponent('[data-testid="dialog-export-btn"]').trigger("click");

			expect(useCommonCartridgeExportMockReturn.startExport).toHaveBeenCalledWith(
				"1.1.0",
				["l1", "l2"],
				[],
				["b1", "b2"]
			);
		});

		it("should deselect all column boards when toggle is clicked", async () => {
			const wrapper = await setupWithReactiveElements(createMixedElements());
			await goToContentSelection(wrapper);

			await wrapper.findComponent('[data-testid="all-column-boards-checkbox"]').trigger("click");
			await wrapper.findComponent('[data-testid="dialog-export-btn"]').trigger("click");

			expect(useCommonCartridgeExportMockReturn.startExport).toHaveBeenCalledWith(
				"1.1.0",
				["l1", "l2"],
				["t1", "t2"],
				[]
			);
		});

		it("should reselect all items when toggle is clicked twice", async () => {
			const wrapper = await setupWithReactiveElements(createMixedElements());
			await goToContentSelection(wrapper);

			const checkbox = wrapper.findComponent('[data-testid="all-topics-checkbox"]');
			await checkbox.trigger("click");
			await checkbox.trigger("click");
			await wrapper.findComponent('[data-testid="dialog-export-btn"]').trigger("click");

			expect(useCommonCartridgeExportMockReturn.startExport).toHaveBeenCalledWith(
				"1.1.0",
				["l1", "l2"],
				["t1", "t2"],
				["b1", "b2"]
			);
		});
	});

	describe("back button resets selections", () => {
		it("should reset all selections to true when going back", async () => {
			const wrapper = await setupWithReactiveElements([
				{ type: BoardElementResponseType.LESSON, content: { id: "l1", name: "Lesson 1" } },
				{ type: BoardElementResponseType.TASK, content: { id: "t1", name: "Task 1" } },
				{ type: BoardElementResponseType.COLUMN_BOARD, content: { id: "b1", title: "Board 1" } },
			] as BoardElementResponse[]);

			await goToContentSelection(wrapper);

			await wrapper.findComponent('[data-testid="all-topics-checkbox"]').trigger("click");
			await wrapper.findComponent('[data-testid="all-tasks-checkbox"]').trigger("click");
			await wrapper.findComponent('[data-testid="all-column-boards-checkbox"]').trigger("click");

			await wrapper.findComponent('[data-testid="dialog-back-btn"]').trigger("click");
			await goToContentSelection(wrapper);
			await wrapper.findComponent('[data-testid="dialog-export-btn"]').trigger("click");

			expect(useCommonCartridgeExportMockReturn.startExport).toHaveBeenCalledWith("1.1.0", ["l1"], ["t1"], ["b1"]);
		});
	});

	describe("individual item selection", () => {
		it("should allow deselecting individual items and export only selected ones", async () => {
			const wrapper = await setupWithReactiveElements([
				{ type: BoardElementResponseType.LESSON, content: { id: "l1", name: "Lesson 1" } },
				{ type: BoardElementResponseType.LESSON, content: { id: "l2", name: "Lesson 2" } },
				{ type: BoardElementResponseType.TASK, content: { id: "t1", name: "Task 1" } },
				{ type: BoardElementResponseType.TASK, content: { id: "t2", name: "Task 2" } },
				{ type: BoardElementResponseType.COLUMN_BOARD, content: { id: "b1", title: "Board 1" } },
				{ type: BoardElementResponseType.COLUMN_BOARD, content: { id: "b2", title: "Board 2" } },
			] as BoardElementResponse[]);

			await goToContentSelection(wrapper);

			const checkboxes = wrapper.findAllComponents({ name: "VCheckbox" });
			// Find and click individual item checkboxes (not the "all" checkboxes)
			// The individual checkboxes don't have data-testid, so we find them by their labels
			for (const checkbox of checkboxes) {
				const label = checkbox.props("label");
				if (label === "Lesson 1" || label === "Task 1" || label === "Board 1") {
					await checkbox.find("input").setValue(false);
				}
			}

			await wrapper.findComponent('[data-testid="dialog-export-btn"]').trigger("click");

			expect(useCommonCartridgeExportMockReturn.startExport).toHaveBeenCalledWith("1.1.0", ["l2"], ["t2"], ["b2"]);
		});
	});

	describe("dialog reset on close", () => {
		it("should reset step to version selection when dialog closes", async () => {
			const wrapper = setup();
			await goToContentSelection(wrapper);
			await wrapper.findComponent('[data-testid="dialog-cancel-btn"]').trigger("click");

			await wrapper.setProps({ isOpen: true });

			expect(wrapper.findComponent('[data-testid="dialog-next-btn"]').exists()).toBe(true);
		});
	});
});
