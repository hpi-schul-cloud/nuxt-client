import DownloadModal from "@/components/download/DownloadModal.vue";
import DownloadModule from "@/store/download";
import { I18N_KEY, NOTIFIER_MODULE_KEY } from "@/utils/inject";
import { createModuleMocks } from "@/utils/mock-store-module";
import vCustomDialog from "@/components/organisms/vCustomDialog.vue";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { MountOptions, mount } from "@vue/test-utils";
import Vue from "vue";
import NotifierModule from "@/store/notifier";

describe("@/components/download/DownloadModal", () => {
	let downloadModuleMock: DownloadModule;
	let notifierModuleMock: NotifierModule;

	const getWrapper = () => {
		const wrapper = mount(DownloadModal as MountOptions<Vue>, {
			...createComponentMocks({
				i18n: true,
			}),
			provide: {
				downloadModule: downloadModuleMock,
				[I18N_KEY.valueOf()]: {
					t: (key: string) => key,
				},
				[NOTIFIER_MODULE_KEY.valueOf()]: notifierModuleMock,
				$store: {
					dispatch: downloadModuleMock.startDownloadFlow,
				},
			},
		});

		return wrapper;
	};

	beforeEach(() => {
		// Avoids console warnings "[Vuetify] Unable to locate target [data-app]"
		document.body.setAttribute("data-app", "true");

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

	it("should have dialog", () => {
		const wrapper = getWrapper();
		const dialog = wrapper.findComponent(vCustomDialog);
		expect(dialog.exists()).toBe(true);
	});

	it("should have title", () => {
		const wrapper = getWrapper();
		const title = wrapper.find(".v-card__title");
		expect(title.exists()).toBe(true);
	});

	it("should have download button", () => {
		const wrapper = getWrapper();
		const downloadButton = wrapper.find(".v-btn");
		expect(downloadButton.exists()).toBe(true);
	});

	it("should call 'startDownload' store method when download button clicked", () => {
		const wrapper = getWrapper();
		const downloadButton = wrapper.find(".v-btn");
		downloadButton.trigger("click");
		expect(downloadModuleMock.startDownload).toHaveBeenCalled();
	});

	it("should call 'resetDownloadFlow' store method when dialog closed", () => {
		const wrapper = getWrapper();
		const dialog = wrapper.findComponent(vCustomDialog);
		dialog.vm.$emit("dialog-closed");
		expect(downloadModuleMock.resetDownloadFlow).toHaveBeenCalled();
	});

	it("should call 'startDownload' store method when sub component emits 'dialog-confirmed'", () => {
		const wrapper = getWrapper();
		const dialog = wrapper.findComponent(vCustomDialog);
		dialog.vm.$emit("dialog-confirmed");
		expect(downloadModuleMock.startDownload).toHaveBeenCalled();
	});

	it("should call 'resetDownloadFlow' store method when sub component emits 'back'", () => {
		const wrapper = getWrapper();
		const dialog = wrapper.findComponent(vCustomDialog);
		dialog.vm.$emit("back");
		expect(downloadModuleMock.setVersion).toHaveBeenCalled();
		expect(downloadModuleMock.setIsDownloadModalOpen).toHaveBeenCalled();
		expect(downloadModuleMock.startDownload).toHaveBeenCalled();
	});

	it("should call 'setVersion' store method when sub component emits 'next'", () => {
		const wrapper = getWrapper();
		const dialog = wrapper.findComponent(vCustomDialog);
		dialog.vm.$emit("next");
		expect(downloadModuleMock.setVersion).toHaveBeenCalled();
	});
});
