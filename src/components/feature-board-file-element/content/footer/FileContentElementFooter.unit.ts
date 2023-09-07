import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { shallowMount } from "@vue/test-utils";
import ContentElementChips from "./chips/ContentElementChips.vue";
import FileDownload from "./download/FileDownload.vue";
import FileContentElementFooter from "./FileContentElementFooter.vue";

describe("FileContentElementFooter", () => {
	const setup = () => {
		document.body.setAttribute("data-app", "true");

		const propsData = {
			fileProperties: {
				name: "file-record #1.txt",
				url: "1/file-record #1.txt",
				isDownloadAllowed: true,
				size: 3800,
			},
		};

		const wrapper = shallowMount(FileContentElementFooter, {
			propsData,
			...createComponentMocks({}),
		});

		return {
			wrapper,
			fileNameProp: propsData.fileProperties.name,
			urlProp: propsData.fileProperties.url,
			isDownloadAllowedProp: propsData.fileProperties.isDownloadAllowed,
			fileSizeProp: propsData.fileProperties.size,
		};
	};

	it("should be found in dom", () => {
		const { wrapper } = setup();

		const fileContentElement = wrapper.findComponent(FileContentElementFooter);

		expect(fileContentElement.exists()).toBe(true);
	});

	it("should render chips component with proper props", () => {
		const { wrapper, fileNameProp, fileSizeProp } = setup();

		const props = wrapper.findComponent(ContentElementChips).attributes();

		expect(props.filename).toEqual(fileNameProp);
		expect(props.filesize).toBe(fileSizeProp.toString());
	});

	it("should render download component with proper props", () => {
		const { wrapper, fileNameProp, urlProp, isDownloadAllowedProp } = setup();

		const props = wrapper.findComponent(FileDownload).attributes();

		expect(props.filename).toEqual(fileNameProp);
		expect(props.url).toEqual(urlProp);
		expect(!!props.isdownloadallowed).toEqual(isDownloadAllowedProp);
	});
});
