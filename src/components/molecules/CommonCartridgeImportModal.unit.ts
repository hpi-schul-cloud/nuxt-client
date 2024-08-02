import CoursesModule from "@/store/courses";
import CommonCartridgeImportModal from "./CommonCartridgeImportModal.vue";
import { mount } from "@vue/test-utils";
import LoadingStateModule from "@/store/loading-state";
import NotifierModule from "@/store/notifier";
import {
	COMMON_CARTRIDGE_IMPORT_MODULE_KEY,
	LOADING_STATE_MODULE_KEY,
	NOTIFIER_MODULE_KEY,
	ROOMS_MODULE_KEY,
} from "@/utils/inject";
import { createModuleMocks } from "@/utils/mock-store-module";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import CommonCartridgeImportModule from "@/store/common-cartridge-import";

describe("@/components/molecules/CommonCartridgeImportModal", () => {
	const setupWrapper = (getters: Partial<CommonCartridgeImportModule>) => {
		document.body.setAttribute("data-app", "true");

		const notifierModuleMock = createModuleMocks(NotifierModule);
		const coursesModuleMock = createModuleMocks(CoursesModule, {
			getAllElements: [],
		});
		const commonCartridgeImportModule = createModuleMocks(
			CommonCartridgeImportModule,
			getters
		);

		const wrapper = mount(CommonCartridgeImportModal, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
				provide: {
					[LOADING_STATE_MODULE_KEY.valueOf()]:
						createModuleMocks(LoadingStateModule),
					[NOTIFIER_MODULE_KEY.valueOf()]: notifierModuleMock,
					[ROOMS_MODULE_KEY.valueOf()]: coursesModuleMock,
					[COMMON_CARTRIDGE_IMPORT_MODULE_KEY.valueOf()]:
						commonCartridgeImportModule,
				},
			},
		});

		return {
			wrapper,
			coursesModuleMock,
			notifierModuleMock,
			commonCartridgeImportModule,
		};
	};

	describe("when dialog is open", () => {
		const setup = () => setupWrapper({ isOpen: true });

		it("should contain disabled confirm button", async () => {
			const { wrapper } = setup();

			const confirmBtn = wrapper.findComponent(
				"[data-testId='dialog-confirm-btn']"
			) as any;

			expect(confirmBtn.exists()).toBe(true);
			expect(confirmBtn.isDisabled()).toBe(true);
		});

		it("should contain enabled cancel button", async () => {
			const { wrapper } = setup();

			const cancelBtn = wrapper.findComponent(
				"[data-testid='dialog-cancel-btn']"
			) as any;

			expect(cancelBtn.exists()).toBe(true);
			expect(cancelBtn.isDisabled()).toBe(false);
		});

		it("should contain file input", () => {
			const { wrapper } = setup();

			const fileInput = wrapper.findComponent(
				"[data-testid='dialog-file-input']"
			) as any;

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

			const confirmBtn = wrapper.findComponent(
				"[data-testId='dialog-confirm-btn']"
			) as any;

			expect(confirmBtn.isDisabled()).toBe(false);
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
			const { wrapper, coursesModuleMock, notifierModuleMock } = setup();
			const confirmBtn = wrapper.findComponent(
				"[data-testId='dialog-confirm-btn']"
			);

			await confirmBtn.trigger("click");

			expect(coursesModuleMock.fetch).toHaveBeenCalledTimes(1);
			expect(coursesModuleMock.fetchAllElements).toHaveBeenCalledTimes(1);
			expect(notifierModuleMock.show).toHaveBeenCalledWith({
				status: "success",
				text: expect.any(String),
				autoClose: true,
			});
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
			const { wrapper, notifierModuleMock, coursesModuleMock } = setup();
			const confirmBtn = wrapper.findComponent(
				"[data-testId='dialog-confirm-btn']"
			);

			await confirmBtn.trigger("click");

			expect(coursesModuleMock.fetch).not.toHaveBeenCalled();
			expect(coursesModuleMock.fetchAllElements).not.toHaveBeenCalled();
			expect(notifierModuleMock.show).toHaveBeenCalledWith({
				status: "error",
				text: expect.any(String),
				autoClose: true,
			});
		});
	});

	describe("when dialog is closed", () => {
		const setup = () => setupWrapper({ isOpen: true });

		it("should reset the state", () => {
			const { wrapper, commonCartridgeImportModule } = setup();
			const cancelBtn = wrapper.findComponent(
				"[data-testid='dialog-cancel-btn']"
			);

			cancelBtn.trigger("click");

			expect(commonCartridgeImportModule.setIsOpen).toHaveBeenCalledWith(false);
		});
	});
});
