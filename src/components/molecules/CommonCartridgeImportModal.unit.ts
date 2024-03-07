import RoomsModule from "@/store/rooms";
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
	const setupWrapper = () => {
		document.body.setAttribute("data-app", "true");

		const commonCartridgeImportModule = new CommonCartridgeImportModule({});

		const wrapper = mount(CommonCartridgeImportModal, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
				provide: {
					[LOADING_STATE_MODULE_KEY.valueOf()]:
						createModuleMocks(LoadingStateModule),
					[NOTIFIER_MODULE_KEY.valueOf()]: createModuleMocks(NotifierModule),
					[ROOMS_MODULE_KEY.valueOf()]: createModuleMocks(RoomsModule),
					[COMMON_CARTRIDGE_IMPORT_MODULE_KEY.valueOf()]:
						commonCartridgeImportModule,
				},
			},
			props: {
				isOpen: true,
				maxWidth: 480,
			},
		});

		return { wrapper, commonCartridgeImportModule };
	};

	describe("when dialog is open", () => {
		const setup = async () => {
			const { wrapper } = setupWrapper();

			await wrapper.setProps({
				isOpen: true,
			});

			return { wrapper };
		};

		it("should contain disabled confirm button", async () => {
			const { wrapper } = await setup();

			const confirmBtn = wrapper.findComponent(
				"[data-testId='dialog-confirm-btn']"
			) as any;

			expect(confirmBtn.exists()).toBe(true);
			expect(confirmBtn.isDisabled()).toBe(true);
		});

		it("should contain enabled cancel button", async () => {
			const { wrapper } = await setup();

			const cancelBtn = wrapper.findComponent(
				"[data-testid='dialog-cancel-btn']"
			) as any;

			expect(cancelBtn.exists()).toBe(true);
			expect(cancelBtn.isDisabled()).toBe(false);
		});

		it("should contain file input", async () => {
			const { wrapper } = await setup();

			const fileInput = wrapper.findComponent(
				"[data-testid='dialog-file-input']"
			) as any;

			expect(fileInput.exists()).toBe(true);
		});
	});
});
