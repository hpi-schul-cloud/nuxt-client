import RoomsModule from "@/store/rooms";
import CommonCartridgeImportModal from "./CommonCartridgeImportModal.vue";
import setupStores from "@@/tests/test-utils/setupStores";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { mount, MountOptions } from "@vue/test-utils";
import Vue from "vue";
import LoadingStateModule from "@/store/loading-state";
import NotifierModule from "@/store/notifier";
import {
	I18N_KEY,
	LOADING_STATE_MODULE_KEY,
	NOTIFIER_MODULE_KEY,
	ROOMS_MODULE_KEY,
} from "@/utils/inject";
import { i18nMock } from "@@/tests/test-utils";
import { createModuleMocks } from "@/utils/mock-store-module";

describe("@/components/molecules/CommonCartridgeImportModal", () => {
	const setup = () => {
		document.body.setAttribute("data-app", "true");
		setupStores({
			loadingStateModule: LoadingStateModule,
			notifierModule: NotifierModule,
			roomsModule: RoomsModule,
		});
		const wrapper = mount(CommonCartridgeImportModal as MountOptions<Vue>, {
			...createComponentMocks({
				i18n: true,
			}),
			propsData: {
				isOpen: false,
			},
			provide: {
				[I18N_KEY.valueOf()]: i18nMock,
				[LOADING_STATE_MODULE_KEY.valueOf()]:
					createModuleMocks(LoadingStateModule),
				[NOTIFIER_MODULE_KEY.valueOf()]: createModuleMocks(NotifierModule),
				[ROOMS_MODULE_KEY.valueOf()]: createModuleMocks(RoomsModule),
			},
		});
		return { wrapper };
	};

	describe("when uploading a file", () => {
		it("should open and close the modal", async () => {
			const { wrapper } = setup();
			const importDialog = wrapper.vm.$refs.commonCartridgeImportDialog as any;

			expect(importDialog).toBeDefined();
			expect(importDialog.value).toBe(false);

			await wrapper.setProps({
				isOpen: true,
			});

			expect(importDialog.value).toBe(true);

			await wrapper.setProps({
				isOpen: false,
			});

			expect(importDialog.value).toBe(false);
		});

		it("should enabled confirm button after selecting a file", async () => {
			const { wrapper } = setup();

			await wrapper.setProps({
				isOpen: true,
			});

			const confirmBtn = wrapper.find("[data-testid='dialog-confirm-btn']");

			expect(confirmBtn.exists()).toBe(true);
			expect(confirmBtn.vm.$props.disabled).toBe(true);

			await wrapper.setData({
				file: new File([""], "filename"),
			});

			expect(confirmBtn.vm.$props.disabled).toBe(false);
		});
	});

	describe("when canceling the upload", () => {
		it("should close the modal and emit dialog-closed event", async () => {
			const { wrapper } = setup();

			await wrapper.setProps({
				isOpen: true,
			});

			const btnCancel = wrapper.find("[data-testid='dialog-cancel-btn']");

			btnCancel.trigger("click");

			const emitted = wrapper.emitted();

			expect(emitted["dialog-closed"]).toHaveLength(1);
		});
	});
});
