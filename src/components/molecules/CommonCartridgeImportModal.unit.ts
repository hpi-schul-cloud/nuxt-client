import CommonCartridgeImportModal from "./CommonCartridgeImportModal.vue";
import CommonCartridgeImportModule from "@/store/common-cartridge-import";
import CourseRoomListModule from "@/store/course-room-list";
import LoadingStateModule from "@/store/loading-state";
import {
	COMMON_CARTRIDGE_IMPORT_MODULE_KEY,
	COURSE_ROOM_LIST_MODULE_KEY,
	LOADING_STATE_MODULE_KEY,
} from "@/utils/inject";
import { expectNotification } from "@@/tests/test-utils";
import { createModuleMocks } from "@@/tests/test-utils/mock-store-module";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { createTestingPinia } from "@pinia/testing";
import { mount } from "@vue/test-utils";
import { setActivePinia } from "pinia";
import { beforeEach } from "vitest";

describe("@/components/molecules/CommonCartridgeImportModal", () => {
	beforeEach(() => {
		setActivePinia(createTestingPinia());
	});

	const setupWrapper = (getters: Partial<CommonCartridgeImportModule>) => {
		document.body.setAttribute("data-app", "true");

		const roomsModuleMock = createModuleMocks(CourseRoomListModule, {
			getAllElements: [],
		});
		const commonCartridgeImportModule = createModuleMocks(CommonCartridgeImportModule, getters);

		const wrapper = mount(CommonCartridgeImportModal, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
				provide: {
					[LOADING_STATE_MODULE_KEY.valueOf()]: createModuleMocks(LoadingStateModule),
					[COURSE_ROOM_LIST_MODULE_KEY.valueOf()]: roomsModuleMock,
					[COMMON_CARTRIDGE_IMPORT_MODULE_KEY.valueOf()]: commonCartridgeImportModule,
				},
			},
		});

		return {
			wrapper,
			roomsModuleMock,
			commonCartridgeImportModule,
		};
	};

	describe("when dialog is open", () => {
		const setup = () => setupWrapper({ isOpen: true });

		it("should contain disabled confirm button", () => {
			const { wrapper } = setup();

			const confirmBtn = wrapper.findComponent("[data-testId='dialog-confirm-btn']");

			expect(confirmBtn.exists()).toBe(true);
			expect(confirmBtn.classes()).toContain("v-btn--disabled");
		});

		it("should contain enabled cancel button", () => {
			const { wrapper } = setup();

			const cancelBtn = wrapper.findComponent("[data-testid='dialog-cancel-btn']");

			expect(cancelBtn.exists()).toBe(true);
			expect(cancelBtn.classes()).not.toContain("v-btn--disabled");
		});

		it("should contain file input", () => {
			const { wrapper } = setup();

			const fileInput = wrapper.findComponent("[data-testid='dialog-file-input']");

			expect(fileInput.exists()).toBe(true);
		});
	});

	describe("when a file is selected", () => {
		const setup = () =>
			setupWrapper({
				isOpen: true,
				file: new File([], "file"),
			});

		it("should enable confirm button", () => {
			const { wrapper } = setup();

			const confirmBtn = wrapper.findComponent("[data-testId='dialog-confirm-btn']");

			expect(confirmBtn.classes()).not.toContain("v-btn--disabled");
		});
	});

	describe("when file upload is successful", () => {
		const setup = () =>
			setupWrapper({
				file: new File([], "file"),
				isOpen: true,
				isSuccess: true,
			});

		it("should show success message", async () => {
			const { wrapper, roomsModuleMock } = setup();
			const confirmBtn = wrapper.findComponent("[data-testId='dialog-confirm-btn']");

			await confirmBtn.trigger("click");

			expect(roomsModuleMock.fetch).toHaveBeenCalledTimes(1);
			expect(roomsModuleMock.fetchAllElements).toHaveBeenCalledTimes(1);
			expectNotification("success");
		});
	});

	describe("when file upload is unsuccessful", () => {
		const setup = () =>
			setupWrapper({
				file: new File([], "file"),
				isOpen: true,
				isSuccess: false,
			});

		it("should show error message", async () => {
			const { wrapper, roomsModuleMock } = setup();
			const confirmBtn = wrapper.findComponent("[data-testId='dialog-confirm-btn']");

			await confirmBtn.trigger("click");

			expect(roomsModuleMock.fetch).toHaveBeenCalled();
			expect(roomsModuleMock.fetchAllElements).toHaveBeenCalled();
			expectNotification("error");
		});
	});

	describe("when dialog is closed", () => {
		const setup = () => setupWrapper({ isOpen: true });

		it("should reset the state", () => {
			const { wrapper, commonCartridgeImportModule } = setup();
			const cancelBtn = wrapper.findComponent("[data-testid='dialog-cancel-btn']");

			cancelBtn.trigger("click");

			expect(commonCartridgeImportModule.setIsOpen).toHaveBeenCalledWith(false);
		});
	});
});
