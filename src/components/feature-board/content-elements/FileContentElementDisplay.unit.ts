import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { shallowMount } from "@vue/test-utils";
import FileContentElementDisplay from "./FileContentElementDisplay.vue";

describe("FileContentElementDisplay", () => {
	const setupProps = () => ({
		fileName: "file-record #1.txt",
		url: "1/file-record #1.txt",
	});

	const setup = () => {
		document.body.setAttribute("data-app", "true");

		const propsData = setupProps();

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

	it("should display icon", async () => {
		const { wrapper } = setup();

		const fileIcon = wrapper.find("v-icon-stub");

		expect(fileIcon.exists()).toBe(true);
	});

	it("should find file name", async () => {
		const { wrapper, fileNameProp } = setup();

		const fileName = wrapper.find("v-list-item-title-stub").text();

		expect(fileName).toBe(fileNameProp);
	});

	it("should find download button", async () => {
		const { wrapper, urlProp } = setup();

		const downloadButton = wrapper.find("v-btn-stub");
		const downloadIcon = wrapper.find("v-icon-stub");

		expect(downloadButton.exists()).toBe(true);
		expect(downloadButton.attributes("href")).toBe(urlProp);
		expect(downloadButton.attributes("download")).toBe("");
		expect(downloadButton.attributes("icon")).toBe("true");
		expect(downloadIcon.exists()).toBe(true);
	});
});
