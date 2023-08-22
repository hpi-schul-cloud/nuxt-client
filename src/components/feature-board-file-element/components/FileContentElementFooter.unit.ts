import { shallowMount } from "@vue/test-utils";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import FileContentElementFooter from "./FileContentElementFooter.vue";
import FileContentElementChips from "./FileContentElementChips.vue";
import FileContentElementDownload from "./FileContentElementDownload.vue";

describe("FileContentElementFooter", () => {
	const setup = () => {
		document.body.setAttribute("data-app", "true");

		const propsData = {
			fileName: "file-record #1.txt",
			url: "1/file-record #1.txt",
			isDownloadAllowed: true,
			fileSize: 3800,
		};

		const wrapper = shallowMount(FileContentElementFooter, {
			propsData,
			...createComponentMocks({}),
		});

		return {
			wrapper,
			fileNameProp: propsData.fileName,
			urlProp: propsData.url,
			isDownloadAllowedProp: propsData.isDownloadAllowed,
			fileSizeProp: propsData.fileSize,
		};
	};

	it("should be found in dom", () => {
		const { wrapper } = setup();

		const fileContentElement = wrapper.findComponent(FileContentElementFooter);

		expect(fileContentElement.exists()).toBe(true);
	});

	it("should render chips component with proper props", () => {
		const { wrapper, fileNameProp, fileSizeProp } = setup();

		const props = wrapper.findComponent(FileContentElementChips).attributes();

		expect(props.filename).toEqual(fileNameProp);
		expect(props.filesize).toBe(fileSizeProp.toString());
	});

	it("should render download component with proper props", () => {
		const { wrapper, fileNameProp, urlProp, isDownloadAllowedProp } = setup();

		const props = wrapper
			.findComponent(FileContentElementDownload)
			.attributes();

		expect(props.filename).toEqual(fileNameProp);
		expect(props.url).toEqual(urlProp);
		expect(!!props.isdownloadallowed).toEqual(isDownloadAllowedProp);
	});
});
