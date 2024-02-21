import DownloadModal from "@/components/download/DownloadModal.vue";
import DownloadModule from "@/store/download";
import {
	DOWNLOAD_MODULE_KEY,
	I18N_KEY,
	NOTIFIER_MODULE_KEY,
} from "@/utils/inject";
import { createModuleMocks } from "@/utils/mock-store-module";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { MountOptions, mount } from "@vue/test-utils";
import Vue from "vue";
import NotifierModule from "@/store/notifier";
import setupStores from "@@/tests/test-utils/setupStores";
import RoomsModule from "@/store/rooms";

describe("@/components/download/DownloadModal", () => {
	let downloadModuleMock: DownloadModule;
	let notifierModuleMock: NotifierModule;

	const getWrapper = () => {
		const wrapper = mount(DownloadModal as MountOptions<Vue>, {
			...createComponentMocks({
				i18n: true,
			}),
			provide: {
				[DOWNLOAD_MODULE_KEY.valueOf()]: downloadModuleMock,
				[I18N_KEY.valueOf()]: {
					t: (key: string) => key,
				},
				[NOTIFIER_MODULE_KEY.valueOf()]: notifierModuleMock,
			},
		});

		return wrapper;
	};

	beforeEach(() => {
		// Avoids console warnings "[Vuetify] Unable to locate target [data-app]"
		document.body.setAttribute("data-app", "true");
		setupStores({ roomsModule: RoomsModule });

		downloadModuleMock = createModuleMocks(DownloadModule, {
			getIsDownloadModalOpen: true,
			startDownload: jest.fn(),
			resetDownloadFlow: jest.fn(),
		});
		notifierModuleMock = createModuleMocks(NotifierModule);
	});

	it("should render", () => {
		const wrapper = getWrapper();
		expect(wrapper.exists()).toBe(true);
	});

	it("should open the Dialog when isOpen true", async () => {
		const wrapper = getWrapper();

		const dialog = wrapper.findComponent({ ref: "downloadDialog" });
		const downloadDialog = wrapper.vm.$refs.downloadDialog as any;
		expect(dialog.exists()).toBe(true);
		expect(downloadDialog).toBeDefined();
		expect(downloadDialog.value).toBe(false);

		await wrapper.setProps({ isOpen: true });
		expect(downloadDialog.value).toBe(true);
	});

	it("should close dialog when close button clicked", async () => {
		const wrapper = getWrapper();
		await wrapper.setProps({ isOpen: true });
		const closeBtn = wrapper.find("[data-testid='dialog-cancel-btn']");
		await closeBtn.trigger("click");
		const emit = wrapper.emitted();
		expect(emit).toHaveProperty("dialog-closed");
	});

	describe("onNext", () => {
		it("should move to step 2 Dialog and have export button", async () => {
			const wrapper = getWrapper();
			await wrapper.setProps({ isOpen: true });
			const nextBtn = wrapper.find("[data-testid='dialog-next-btn']");
			await nextBtn.trigger("click");
			const emit = wrapper.find("[data-testid='dialog-export-btn']");

			expect(emit.exists()).toBe(true);
		});
	});

	describe("onBack", () => {
		it("should move to step 1 Dialog", async () => {
			const wrapper = getWrapper();
			await wrapper.setProps({ isOpen: true });
			const nextBtn = wrapper.find("[data-testid='dialog-next-btn']");
			await nextBtn.trigger("click");
			const backBtn = wrapper.find("[data-testid='dialog-back-btn']");
			await backBtn.trigger("click");
			const emit = wrapper.find("[data-testid='dialog-next-btn']");

			expect(emit.exists()).toBe(true);
		});
	});

	describe("onDownload", () => {
		it("should call startDownload and close the dialog", async () => {
			const wrapper = getWrapper();
			await wrapper.setProps({ isOpen: true });
			const nextBtn = wrapper.find("[data-testid='dialog-next-btn']");
			await nextBtn.trigger("click");
			const downloadBtn = wrapper.find("[data-testid='dialog-export-btn']");
			await downloadBtn.trigger("click");
			await wrapper.setProps({ isOpen: false });
			downloadModuleMock.startDownload("1.1.0");

			expect(downloadBtn.exists()).toBe(false);
			expect(downloadModuleMock.startDownload).toHaveBeenCalled();
		});
	});

	describe("toggleAllTopics", () => {
		it("should start with true and change the value when click", async () => {
			const wrapper = getWrapper();
			await wrapper.setProps({ isOpen: true });
			const nextBtn = wrapper.find("[data-testid='dialog-next-btn']");
			await nextBtn.trigger("click");

			const allTopics = wrapper.find("[data-testid='all-topics-checkbox']");
			expect(allTopics.attributes("aria-checked")).toBe("true");

			await allTopics.trigger("click");
			expect(allTopics.attributes("aria-checked")).toBe("false");
		});
	});

	describe("toggleAllTasks", () => {
		it("should start with true and change the value when click", async () => {
			const wrapper = getWrapper();
			await wrapper.setProps({ isOpen: true });
			const nextBtn = wrapper.find("[data-testid='dialog-next-btn']");
			await nextBtn.trigger("click");

			const allTasks = wrapper.find("[data-testid='all-tasks-checkbox']");
			expect(allTasks.attributes("aria-checked")).toBe("true");

			await allTasks.trigger("click");
			expect(allTasks.attributes("aria-checked")).toBe("false");
		});
	});
});
