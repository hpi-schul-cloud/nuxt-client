import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { shallowMount } from "@vue/test-utils";
import ImageDisplay from "./ImageDisplay.vue";

describe("ImageDisplay", () => {
	const setup = (isEditMode: boolean) => {
		document.body.setAttribute("data-app", "true");

		const propsData = {
			name: "file-record #1.txt",
			previewUrl: "preview/1/file-record #1.txt",
			isEditMode,
		};

		const wrapper = shallowMount(ImageDisplay, {
			propsData,
			...createComponentMocks({}),
		});

		return {
			wrapper,
			fileNameProp: propsData.name,
			previewUrl: propsData.previewUrl,
		};
	};
	const imageSelektor = "img";

	describe("when isEditMode is false", () => {
		it("should be found in dom", () => {
			const { wrapper } = setup(false);

			const fileContentElement = wrapper.findComponent(ImageDisplay);

			expect(fileContentElement.exists()).toBe(true);
		});

		it("should display image", () => {
			const { wrapper } = setup(false);

			const image = wrapper.find(imageSelektor);

			expect(image.exists()).toBe(true);
		});

		it("should have set loading to lazy", () => {
			const { wrapper } = setup(false);

			const loading = wrapper.find(imageSelektor).attributes("loading");

			expect(loading).toBe("lazy");
		});

		it("should have set loading before src", () => {
			// This test ensures that "loading" attribute is rendered before "src",
			// because the order of attributes is crucial for lazy loading to work.
			const { wrapper, fileNameProp } = setup(false);

			const renderedImageTag = wrapper.find(imageSelektor).html();
			const expectedHtml = `<img loading="lazy" src="preview/1/${fileNameProp}" alt="${fileNameProp}" class="rounded-t-sm image">`;

			expect(renderedImageTag).toBe(expectedHtml);
		});

		it("should have set src correctly", () => {
			const { wrapper, previewUrl } = setup(false);

			const src = wrapper.find(imageSelektor).attributes("src");

			expect(src).toBe(previewUrl);
		});

		it("should have set alt correctly", () => {
			const { wrapper, fileNameProp } = setup(false);

			const alt = wrapper.find(imageSelektor).attributes("alt");

			expect(alt).toBe(fileNameProp);
		});

		it("should not display div with class 'menu-background'", () => {
			const { wrapper } = setup(false);

			const div = wrapper.find(".menu-background");
			console.log(wrapper.props());

			expect(div.exists()).toBe(false);
		});
	});

	describe("when isEditMode is true", () => {
		it("should be found in dom", () => {
			const { wrapper } = setup(true);

			const fileContentElement = wrapper.findComponent(ImageDisplay);

			expect(fileContentElement.exists()).toBe(true);
		});

		it("should display image", () => {
			const { wrapper } = setup(true);

			const image = wrapper.find(imageSelektor);

			expect(image.exists()).toBe(true);
		});

		it("should have set src correctly", () => {
			const { wrapper, previewUrl } = setup(true);

			const src = wrapper.find(imageSelektor).attributes("src");

			expect(src).toBe(previewUrl);
		});

		it("should have set alt correctly", () => {
			const { wrapper, fileNameProp } = setup(true);

			const alt = wrapper.find(imageSelektor).attributes("alt");

			expect(alt).toBe(fileNameProp);
		});

		it("should display div with class 'menu-background'", () => {
			const { wrapper } = setup(true);

			const div = wrapper.find(".menu-background");

			expect(div.exists()).toBe(true);
		});
	});
});
