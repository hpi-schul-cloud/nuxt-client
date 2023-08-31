import { shallowMount } from "@vue/test-utils";
import ImageDisplay from "./ImageDisplay.vue";

describe("ImageDisplay", () => {
	const setupProps = () => ({
		fileProperties: {
			name: "file-record #1.txt",
			url: "1/file-record #1.txt",
			previewUrl: "preview/1/file-record #1.txt",
			isDownloadAllowed: true,
		},
		fileId: "file-id #1",
		isEditMode: false,
		isFirstElement: true,
		isLastElement: false,
		hasMultipleElements: false,
	});

	const setup = (isEditMode = false) => {
		document.body.setAttribute("data-app", "true");

		const propsData = setupProps();

		const wrapper = shallowMount(ImageDisplay, {
			propsData: { ...propsData, isEditMode },
		});

		return {
			wrapper,
			fileNameProp: propsData.fileProperties.name,
			isDownloadAllowedProp: propsData.fileProperties.isDownloadAllowed,
			previewUrl: propsData.fileProperties.previewUrl,
			isFirstElementProp: propsData.isFirstElement,
			isLastElementProp: propsData.isLastElement,
			hasMultipleElementsProp: propsData.hasMultipleElements,
		};
	};

	it("should be found in dom", () => {
		const { wrapper } = setup();

		const fileContentElement = wrapper.findComponent(ImageDisplay);

		expect(fileContentElement.exists()).toBe(true);
	});

	it("should display image", () => {
		const { wrapper } = setup();

		const image = wrapper.find("v-img");

		expect(image.exists()).toBe(true);
	});

	it("should have set src correctly", () => {
		const { wrapper, previewUrl } = setup();

		const src = wrapper.find("v-img").attributes("src");

		expect(src).toBe(previewUrl);
	});

	it("should have set alt correctly", () => {
		const { wrapper, fileNameProp } = setup();

		const alt = wrapper.find("v-img").attributes("alt");

		expect(alt).toBe(fileNameProp);
	});
});
