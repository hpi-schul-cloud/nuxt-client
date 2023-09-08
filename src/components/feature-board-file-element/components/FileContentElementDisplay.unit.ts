import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { shallowMount } from "@vue/test-utils";
import FileContentElementDisplay from "./FileContentElementDisplay.vue";

describe("FileContentElementDisplay", () => {
	const setupProps = (isDownloadAllowed?: boolean) => ({
		fileProperties: {
			name: "file-record #1.txt",
			url: "1/file-record #1.txt",
			isDownloadAllowed: isDownloadAllowed ?? true,
		},
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
			fileNameProp: propsData.fileProperties.name,
			urlProp: propsData.fileProperties.url,
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

	it("should find file name", () => {
		const { wrapper, fileNameProp } = setup();

		const fileName = wrapper.find("span").text();

		expect(fileName).toBe(fileNameProp);
	});
});
