import FileDownload from "./FileDownload.vue";
import { downloadFile } from "@/utils/fileHelper";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { mdiTrayArrowDown } from "@icons/material";
import { mount, shallowMount } from "@vue/test-utils";
import { VBtn, VIcon } from "vuetify/components";

vi.mock("@/utils/fileHelper");

describe("FileDownload", () => {
	beforeEach(() => {
		vi.resetAllMocks();
	});

	const setup = () => {
		const wrapper = shallowMount(FileDownload, {
			global: { plugins: [createTestingVuetify(), createTestingI18n()] },
			props: {
				fileName: "file-record #1.txt",
				url: "1/file-record #1.txt",
				isDownloadAllowed: true,
			},
		});

		return {
			wrapper,
		};
	};

	it("should be found in dom", () => {
		const { wrapper } = setup();

		const fileContentElement = wrapper.findComponent(FileDownload);
		expect(fileContentElement.exists()).toBe(true);
	});

	it("should display icon", () => {
		const { wrapper } = setup();

		const icon = wrapper.find("v-icon-stub");

		expect(icon.exists()).toBe(true);
	});

	it("should display button", () => {
		const { wrapper } = setup();

		const button = wrapper.find("v-btn-stub");

		expect(button.exists()).toBe(true);
	});

	it("should have an accessible download button", () => {
		const { wrapper } = setup();

		const button = wrapper.find("v-btn-stub");

		expect(button.attributes("aria-label")).toBe("components.board.action.download");
	});

	describe("when download is allowed", () => {
		describe("when download icon is clicked", () => {
			const setup = () => {
				const props = {
					fileName: "file-record #1.txt",
					url: "1/file-record #1.txt",
					isDownloadAllowed: true,
				};

				const downloadFileMock = vi.mocked(downloadFile).mockReturnValueOnce();

				const wrapper = shallowMount(FileDownload, {
					global: { plugins: [createTestingVuetify(), createTestingI18n()] },
					props,
				});

				return {
					wrapper,
					fileNameProp: props.fileName,
					urlProp: props.url,
					downloadFileMock,
				};
			};

			it("should download file", async () => {
				const { wrapper, urlProp, fileNameProp, downloadFileMock } = setup();

				const button = wrapper.find("v-btn-stub");
				await button.trigger("click");

				expect(downloadFileMock).toHaveBeenCalledWith(urlProp, fileNameProp);
			});
		});

		describe("when download icon is focused and enter is pressed", () => {
			const setup = () => {
				const parentKeydownHandler = vi.fn();
				const props = {
					fileName: "file-record #1.txt",
					url: "1/file-record #1.txt",
					isDownloadAllowed: true,
				};

				const parent = {
					template: `<div @keydown="onKeydown"><FileDownload v-bind="props" /></div>`,
					components: { FileDownload },
					methods: { onKeydown: parentKeydownHandler },
					data() {
						return { props };
					},
				};

				const downloadFileMock = vi.mocked(downloadFile).mockReturnValueOnce();

				const wrapper = mount(parent, {
					global: { plugins: [createTestingVuetify(), createTestingI18n()] },
				});

				return {
					wrapper,
					fileNameProp: props.fileName,
					urlProp: props.url,
					downloadFileMock,
					parentKeydownHandler,
				};
			};

			it("should download file", async () => {
				const { wrapper, urlProp, fileNameProp, downloadFileMock } = setup();

				const button = wrapper.findComponent(VBtn);
				await button.trigger("keydown.enter");

				expect(downloadFileMock).toHaveBeenCalledWith(urlProp, fileNameProp);
			});

			it("should not propagate the event", async () => {
				const { wrapper, parentKeydownHandler } = setup();

				const icon = wrapper.findComponent(FileDownload).findComponent(VIcon);
				await icon.trigger("keydown.enter");

				expect(parentKeydownHandler).not.toHaveBeenCalled();
			});
		});

		describe("when download icon is not clicked", () => {
			it("should display correctly download icon", () => {
				const { wrapper } = setup();

				const icon = wrapper.find("v-icon-stub");
				expect(icon.element.innerHTML).toContain(mdiTrayArrowDown);
			});
		});
	});

	describe("when download is not allowed", () => {
		const setup = () => {
			document.body.setAttribute("data-app", "true");

			const props = {
				fileName: "file-record #1.txt",
				url: "1/file-record #1.txt",
				isDownloadAllowed: false,
			};

			const downloadFileMock = vi.mocked(downloadFile).mockReturnValueOnce();

			const wrapper = shallowMount(FileDownload, {
				global: { plugins: [createTestingVuetify(), createTestingI18n()] },
				props,
			});

			return {
				wrapper,
				downloadFileMock,
			};
		};

		it("should be disabled", () => {
			const { wrapper } = setup();
			const button = wrapper.find("v-btn-stub");
			expect(button.attributes().disabled).toEqual("true");
		});
	});
});
