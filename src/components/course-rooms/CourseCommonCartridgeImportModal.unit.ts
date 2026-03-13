import CourseCommonCartridgeImportModal from "./CourseCommonCartridgeImportModal.vue";
import CourseRoomListModule from "@/store/course-room-list";
import { COURSE_ROOM_LIST_MODULE_KEY } from "@/utils/inject";
import { expectNotification, mockComposable } from "@@/tests/test-utils";
import { createModuleMocks } from "@@/tests/test-utils/mock-store-module";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { useCommonCartridgeImport } from "@data-common-cartridge";
import { createTestingPinia } from "@pinia/testing";
import { mount } from "@vue/test-utils";
import { setActivePinia } from "pinia";
import { beforeEach, Mocked } from "vitest";
import { ref } from "vue";

vi.mock("@data-common-cartridge");
const useCommonCartridgeImportMock = vi.mocked(useCommonCartridgeImport);

describe("CourseCommonCartridgeImportModal", () => {
	let useCommonCartridgeImportMockReturn: Mocked<ReturnType<typeof useCommonCartridgeImport>>;

	beforeEach(() => {
		setActivePinia(createTestingPinia());

		useCommonCartridgeImportMockReturn = mockComposable(useCommonCartridgeImport);
		useCommonCartridgeImportMock.mockReturnValue(useCommonCartridgeImportMockReturn);
	});

	const setup = (overrides: Partial<ReturnType<typeof useCommonCartridgeImport>> = {}) => {
		if (overrides) {
			Object.entries(overrides).forEach(([key, value]) => {
				if (value !== undefined) {
					(useCommonCartridgeImportMockReturn as Record<string, unknown>)[key] = value;
				}
			});
		}

		const roomsModuleMock = createModuleMocks(CourseRoomListModule, {
			getAllElements: [],
		});

		const wrapper = mount(CourseCommonCartridgeImportModal, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
				provide: {
					[COURSE_ROOM_LIST_MODULE_KEY.valueOf()]: roomsModuleMock,
				},
			},
		});

		return {
			wrapper,
			roomsModuleMock,
			useCommonCartridgeImportMockReturn,
		};
	};

	describe("when dialog is open", () => {
		it("should contain disabled confirm button", () => {
			const { wrapper } = setup({ isOpen: ref(true) });

			const confirmBtn = wrapper.findComponent("[data-testid='dialog-confirm-btn']");

			expect(confirmBtn.exists()).toBe(true);
			expect(confirmBtn.classes()).toContain("v-btn--disabled");
		});

		it("should contain enabled cancel button", () => {
			const { wrapper } = setup({ isOpen: ref(true) });

			const cancelBtn = wrapper.findComponent("[data-testid='dialog-cancel-btn']");

			expect(cancelBtn.exists()).toBe(true);
			expect(cancelBtn.classes()).not.toContain("v-btn--disabled");
		});

		it("should contain file input", () => {
			const { wrapper } = setup({ isOpen: ref(true) });

			const fileInput = wrapper.findComponent("[data-testid='dialog-file-input']");

			expect(fileInput.exists()).toBe(true);
		});
	});

	describe("when a file is selected", () => {
		it("should enable confirm button", () => {
			const { wrapper } = setup({
				isOpen: ref(true),
				file: ref(new File([], "file")),
			});

			const confirmBtn = wrapper.findComponent("[data-testid='dialog-confirm-btn']");

			expect(confirmBtn.classes()).not.toContain("v-btn--disabled");
		});
	});

	describe("when file upload is successful", () => {
		it("should show success message", async () => {
			const { wrapper, roomsModuleMock } = setup({
				file: ref(new File([], "file")),
				isOpen: ref(true),
				isSuccess: ref(true),
			});

			const confirmBtn = wrapper.findComponent("[data-testid='dialog-confirm-btn']");

			await confirmBtn.trigger("click");

			expect(roomsModuleMock.fetch).toHaveBeenCalledTimes(1);
			expect(roomsModuleMock.fetchAllElements).toHaveBeenCalledTimes(1);
			expectNotification("success");
		});
	});

	describe("when file upload is unsuccessful", () => {
		it("should show error message", async () => {
			const { wrapper, roomsModuleMock } = setup({
				file: ref(new File([], "file")),
				isOpen: ref(true),
				isSuccess: ref(false),
			});

			const confirmBtn = wrapper.findComponent("[data-testid='dialog-confirm-btn']");

			await confirmBtn.trigger("click");

			expect(roomsModuleMock.fetch).toHaveBeenCalled();
			expect(roomsModuleMock.fetchAllElements).toHaveBeenCalled();
			expectNotification("error");
		});
	});

	describe("when dialog is closed", () => {
		it("should reset the state", () => {
			const { wrapper, useCommonCartridgeImportMockReturn } = setup({
				isOpen: ref(true),
			});

			const cancelBtn = wrapper.findComponent("[data-testid='dialog-cancel-btn']");

			cancelBtn.trigger("click");

			expect(useCommonCartridgeImportMockReturn.isOpen.value).toBe(false);
		});
	});
});
