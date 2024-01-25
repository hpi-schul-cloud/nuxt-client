import RoomsModule from "@/store/rooms";
import UploadModal from "./UploadModal.vue";
import setupStores from "@@/tests/test-utils/setupStores";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { mount, MountOptions } from "@vue/test-utils";
import Vue from "vue";
import LoadingStateModule from "@/store/loading-state";
import NotifierModule from "@/store/notifier";

jest.mock("@/utils/inject", () => ({
	__esModule: true,
	...jest.requireActual("@/utils/inject"),
	injectStrict: jest.fn(),
}));

describe("@/components/molecules/UploadModal", () => {
	const setup = () => {
		document.body.setAttribute("data-app", "true");
		setupStores({
			loadingStateModule: LoadingStateModule,
			notifierModule: NotifierModule,
			roomsModule: RoomsModule,
		});
		const wrapper = mount(UploadModal as MountOptions<Vue>, {
			...createComponentMocks({
				i18n: true,
			}),
			propsData: {
				isOpen: false,
			},
		});
		return {
			wrapper,
		};
	};

	describe("when uploading a file", () => {
		it("should open and close the modal", async () => {
			const { wrapper } = setup();
			const dialog = wrapper.find(".upload-dialog");
			const uploadDialog = wrapper.vm.$refs.uploadDialog as any;

			expect(dialog.exists()).toBe(true);
			expect(uploadDialog.isOpen).toBe(false);

			await wrapper.setProps({
				isOpen: true,
			});

			expect(uploadDialog.isOpen).toBe(true);

			await wrapper.setProps({
				isOpen: false,
			});

			expect(uploadDialog.isOpen).toBe(false);
		});

		it("should view upload button after selecting a file", async () => {
			const { wrapper } = setup();
			const uploadDialog = wrapper.vm.$refs.uploadDialog as any;

			expect(uploadDialog.buttons).toEqual(["cancel"]);

			await wrapper.setProps({
				isOpen: true,
			});
			await wrapper.setData({
				file: new File([""], "filename"),
			});

			expect(uploadDialog.buttons).toEqual(["cancel", "confirm"]);
		});

		it.skip("should upload file and trigger events dialog-closed and update-rooms", async () => {
			const { wrapper } = setup();

			await wrapper.setProps({
				isOpen: true,
			});
			await wrapper.setData({
				file: new File([""], "filename"),
			});

			const confirmBtn = wrapper.find("[data-testid='dialog-confirm']");

			confirmBtn.trigger("click");

			const emitted = wrapper.emitted();

			expect(emitted["dialog-closed"]).toHaveLength(1);
			expect(emitted["update-rooms"]).toHaveLength(1);
		});
	});

	describe("when canceling the upload", () => {
		it.skip("should close the modal and emit dialog-closed event", () => {
			const { wrapper } = setup();
			const btnCancel = wrapper.find("[data-testid='dialog-cancel']");

			btnCancel.trigger("click");

			const emitted = wrapper.emitted();

			expect(emitted["dialog-closed"]).toHaveLength(1);
		});
	});
});
