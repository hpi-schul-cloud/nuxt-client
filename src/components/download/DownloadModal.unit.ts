import DownloadModal from "@/components/download/DownloadModal.vue";
import DownloadModule from "@/store/download";
import NotifierModule from "@/store/notifier";
import RoomsModule from "@/store/rooms";
import {
	DOWNLOAD_MODULE_KEY,
	NOTIFIER_MODULE_KEY,
	ROOM_MODULE_KEY,
} from "@/utils/inject";
import { createModuleMocks } from "@/utils/mock-store-module";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { mount } from "@vue/test-utils";
import { VDialog } from "vuetify/lib/components/index.mjs";

describe("@/components/download/DownloadModal", () => {
	let downloadModuleMock: DownloadModule;
	const setup = () => {
		downloadModuleMock = createModuleMocks(DownloadModule, {
			getIsDownloadModalOpen: true,
			getVersion: "1.1.0",
			startDownload: jest.fn(),
			resetDownloadFlow: jest.fn(),
		});
		const wrapper = mount(DownloadModal, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
				provide: {
					[DOWNLOAD_MODULE_KEY.valueOf()]: downloadModuleMock,
					[NOTIFIER_MODULE_KEY.valueOf()]: createModuleMocks(NotifierModule),
					[ROOM_MODULE_KEY.valueOf()]: createModuleMocks(RoomsModule),
				},
			},
		});
		return wrapper;
	};

	it("should render", () => {
		const wrapper = setup();
		expect(wrapper.exists()).toBe(true);
	});

	describe("when getIsDownloadModalOpen is true", () => {
		it("schould open the Dialog", async () => {
			const wrapper = setup();
			const dialog = wrapper.findComponent(VDialog);
			expect(dialog.props("modelValue")).toBe(true);
		});
	});

	describe("onCancel / onCloseDialog", () => {
		it("should close dialog when cancel button clicked", async () => {
			const wrapper = setup();
			const closeBtn = wrapper.findComponent(
				'[data-testid="dialog-cancel-btn"]'
			);
			await closeBtn.trigger("click");
			const emit = wrapper.emitted();
			expect(emit).toHaveProperty("dialog-closed");
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

	describe("onDownload", () => {
		it("should call startDownload and close the dialog", async () => {
			const wrapper = setup();
			const nextBtn = wrapper.findComponent("[data-testid='dialog-next-btn']");
			await nextBtn.trigger("click");
			const downloadBtn = wrapper.findComponent(
				'[data-testid="dialog-export-btn"]'
			);
			await downloadBtn.trigger("click");
			downloadModuleMock.startDownload("1.1.0");

			expect(downloadBtn.exists()).toBe(false);
			expect(downloadModuleMock.startDownload).toHaveBeenCalled();
		});
	});
});
