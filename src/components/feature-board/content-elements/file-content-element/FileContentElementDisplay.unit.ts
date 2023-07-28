import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { shallowMount } from "@vue/test-utils";
import FileContentElementDisplay from "./FileContentElementDisplay.vue";

describe("FileContentElementDisplay", () => {
	const setupProps = (isDownloadAllowed?: boolean) => ({
		fileName: "file-record #1.txt",
		url: "1/file-record #1.txt",
		isDownloadAllowed: isDownloadAllowed ?? true,
	});

	const setup = (isDownloadAllowed?: boolean) => {
		document.body.setAttribute("data-app", "true");

		const propsData = setupProps(isDownloadAllowed);

		const wrapper = shallowMount(FileContentElementDisplay, {
			...createComponentMocks({ i18n: true }),
			propsData,
		});

		return {
			wrapper,
			fileNameProp: propsData.fileName,
			urlProp: propsData.url,
		};
	};

	it("should be found in dom", () => {
		const { wrapper } = setup();

		const fileContentElement = wrapper.findComponent(FileContentElementDisplay);
		expect(fileContentElement.exists()).toBe(true);
	});

	it("should display icon", () => {
		const { wrapper } = setup();

		const fileIcon = wrapper.find("v-icon-stub");

		expect(fileIcon.exists()).toBe(true);
	});

	describe("when download is allowed", () => {
		it("should find file name", () => {
			const { wrapper, fileNameProp } = setup();

			const fileName = wrapper.find("a").text();

			expect(fileName).toBe(fileNameProp);
		});

		it("should find download url", () => {
			const { wrapper, urlProp, fileNameProp } = setup();

			const downloadLink = wrapper.find("a");

			expect(downloadLink.exists()).toBe(true);
			expect(downloadLink.attributes("href")).toBe(urlProp);
			expect(downloadLink.attributes("download")).toBe(fileNameProp);
		});
	});

	describe("when download is NOT allowed", () => {
		it("should find file name", () => {
			const { wrapper, fileNameProp } = setup(false);

			const fileName = wrapper.find("span").text();

			expect(fileName).toBe(fileNameProp);
		});

		it("should NOT find download url", () => {
			const { wrapper } = setup(false);

			const downloadLink = wrapper.find("a");

			expect(downloadLink.exists()).toBe(false);
		});
	});
});
