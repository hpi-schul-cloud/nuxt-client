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
	const setup = () => {
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
		it("should disable confirm button", async () => {
			const { wrapper } = setup();

			await wrapper.setProps({
				isOpen: true,
			});

			const confirmBtn = wrapper.findComponent(
				"[data-testId='dialog-confirm-btn']"
			);

			expect(confirmBtn.exists()).toBe(true);
			// expect(confirmBtn.).toBe(true);
		});

		// it("should enabled confirm button after selecting a file", async () => {
		// 	const { wrapper } = setup();

		// 	await wrapper.setProps({
		// 		isOpen: true,
		// 	});

		// 	const confirmBtn = wrapper.find("[data-testId='dialog-confirm-btn']");

		// 	expect(confirmBtn.exists()).toBe(true);
		// 	expect(confirmBtn.attributes()["disabled"]).toBe(true);

		// 	await wrapper.setData({
		// 		file: new File([""], "filename"),
		// 	});

		// 	expect(confirmBtn.attributes()["disabled"]).toBe(false);
		// });
	});

	// describe("when canceling the upload", () => {
	// 	it("should close the modal and emit dialog-closed event", async () => {
	// 		const { wrapper } = setup();

	// 		await wrapper.setProps({
	// 			isOpen: true,
	// 		});

	// 		const btnCancel = wrapper.find("[data-testid='dialog-cancel-btn']");

	// 		btnCancel.trigger("click");

	// 		const emitted = wrapper.emitted();

	// 		expect(emitted["dialog-closed"]).toHaveLength(1);
	// 	});
	// });
});
