import { shallowMount } from "@vue/test-utils";
import FileContentElementDownload from "./FileContentElementDownload.vue";
import { downloadFile } from "@/utils/fileHelper";

jest.mock("@/utils/fileHelper");

describe("FileContentElementDownload", () => {
	beforeEach(() => {
		jest.resetAllMocks();
	});

	const setup = () => {
		document.body.setAttribute("data-app", "true");

		const wrapper = shallowMount(FileContentElementDownload);

		return {
			wrapper,
		};
	};

	it("should be found in dom", () => {
		const { wrapper } = setup();

		const fileContentElement = wrapper.findComponent(
			FileContentElementDownload
		);
		expect(fileContentElement.exists()).toBe(true);
	});

	it("should display icon", () => {
		const { wrapper } = setup();

		const icon = wrapper.find("v-icon");

		expect(icon.exists()).toBe(true);
	});

	describe("when download is allowed", () => {
		describe("when download icon is clicked", () => {
			const setup = () => {
				document.body.setAttribute("data-app", "true");

				const propsData = {
					fileName: "file-record #1.txt",
					url: "1/file-record #1.txt",
					isDownloadAllowed: true,
				};

				const downloadFileMock = jest
					.mocked(downloadFile)
					.mockReturnValueOnce();

				const wrapper = shallowMount(FileContentElementDownload, {
					propsData,
				});

				return {
					wrapper,
					fileNameProp: propsData.fileName,
					urlProp: propsData.url,
					downloadFileMock,
				};
			};

			it("should download file", async () => {
				const { wrapper, urlProp, fileNameProp, downloadFileMock } = setup();

				const icon = wrapper.find("v-icon");
				await icon.trigger("click");

				expect(downloadFileMock).toHaveBeenCalledTimes(1);
				expect(downloadFileMock).toHaveBeenCalledWith(urlProp, fileNameProp);
			});
		});

		describe("when download icon is not clicked", () => {
			it("should display correctly download icon", () => {
				const { wrapper } = setup();

				const icon = wrapper.find("v-icon");

				expect(icon.text()).toBe("$mdiTrayArrowDown");
			});
		});
	});

	describe("when download is not allowed", () => {
		const setup = () => {
			document.body.setAttribute("data-app", "true");

			const propsData = {
				fileName: "file-record #1.txt",
				url: "1/file-record #1.txt",
				isDownloadAllowed: false,
			};

			const downloadFileMock = jest.mocked(downloadFile).mockReturnValueOnce();

			const wrapper = shallowMount(FileContentElementDownload, {
				propsData,
			});

			return {
				wrapper,
				downloadFileMock,
			};
		};

		it("should download icon be disabled", () => {
			const { wrapper } = setup();
			const icon = wrapper.find("v-icon");
			expect(icon.attributes().disabled).toEqual("true");
		});
	});
});
