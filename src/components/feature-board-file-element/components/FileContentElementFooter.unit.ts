import { shallowMount } from "@vue/test-utils";
import FileContentElementFooter from "./FileContentElementFooter.vue";
import FileContentElementChips from "./FileContentElementChips.vue";
import FileContentElementDownload from "./FileContentElementDownload.vue";

describe("FileContentElementFooter", () => {
	const setup = () => {
		document.body.setAttribute("data-app", "true");

		const setupProps = (isDownloadAllowed?: boolean) => ({
			fileName: "file-record #1.txt",
			url: "1/file-record #1.txt",
			isDownloadAllowed: true,
		});
		const propsData = setupProps();
		const wrapper = shallowMount(FileContentElementFooter, {
			propsData,
		});

		return {
			wrapper,
			fileNameProp: propsData.fileName,
			urlProp: propsData.url,
			isDownloadAllowedProp: propsData.isDownloadAllowed,
		};
	};

	it("should be found in dom", () => {
		const { wrapper } = setup();

		const fileContentElement = wrapper.findComponent(FileContentElementFooter);
		expect(fileContentElement.exists()).toBe(true);
	});

	it("should render chips component with proper props", () => {
		const { wrapper, fileNameProp } = setup();
		const props = wrapper.findComponent(FileContentElementChips).attributes();

		expect(props.filename).toEqual(fileNameProp);
	});

	it("should render download component with proper props", () => {
		const { wrapper, fileNameProp, urlProp, isDownloadAllowedProp } = setup();
		const props = wrapper
			.findComponent(FileContentElementDownload)
			.attributes();
		console.log(props);
		expect(props.filename).toEqual(fileNameProp);
		expect(props.url).toEqual(urlProp);
		expect(!!props.isdownloadallowed).toEqual(isDownloadAllowedProp);
	});
});
