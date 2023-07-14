import { shallowMount } from "@vue/test-utils";
import FileContentElementMenu from "./FileContentElementMenu.vue";
import ImageFileDisplay from "./ImageFileDisplay.vue";

describe("ImageFileDisplay", () => {
	const setupProps = () => ({
		fileId: "file-id #1",
		fileName: "file-record #1.txt",
		url: "1/file-record #1.txt",
		isDownloadAllowed: true,
		isEditMode: false,
		isFirstElement: true,
		isLastElement: false,
		hasMultipleElements: false,
	});

	const setup = (isEditMode = false) => {
		document.body.setAttribute("data-app", "true");

		const propsData = setupProps();

		const wrapper = shallowMount(ImageFileDisplay, {
			propsData: { ...propsData, isEditMode },
		});

		return {
			wrapper,
			fileNameProp: propsData.fileName,
			isDownloadAllowedProp: propsData.isDownloadAllowed,
			urlProp: propsData.url,
			isFirstElementProp: propsData.isFirstElement,
			isLastElementProp: propsData.isLastElement,
			hasMultipleElementsProp: propsData.hasMultipleElements,
		};
	};

	describe("when component is not in edit mode", () => {
		it("should be found in dom", () => {
			const { wrapper } = setup();

			const fileContentElement = wrapper.findComponent(ImageFileDisplay);

			expect(fileContentElement.exists()).toBe(true);
		});

		it("should display image", () => {
			const { wrapper } = setup();

			const image = wrapper.find("v-img");

			expect(image.exists()).toBe(true);
		});

		it("should have set src correctly", () => {
			const { wrapper, urlProp } = setup();

			const src = wrapper.find("v-img").attributes("src");

			expect(src).toBe(urlProp);
		});

		it("should have set alt correctly", () => {
			const { wrapper, fileNameProp } = setup();

			const alt = wrapper.find("v-img").attributes("alt");

			expect(alt).toBe(fileNameProp);
		});

		it("should NOT render the FileContentElementMenu", () => {
			const { wrapper } = setup();

			const menu = wrapper.findComponent(FileContentElementMenu);

			expect(menu.exists()).toBe(false);
		});
	});

	describe("when component is in edit mode", () => {
		it("should render the FileContentElementMenu", () => {
			const { wrapper } = setup(true);

			const menu = wrapper.findComponent(FileContentElementMenu);

			expect(menu.exists()).toBe(true);
		});

		it("should hand over fileName prop correctly to FileContentElementMenu", () => {
			const { wrapper, fileNameProp } = setup(true);

			const fileName = wrapper
				.findComponent(FileContentElementMenu)
				.props("fileName");

			expect(fileName).toBe(fileNameProp);
		});

		it("should hand over url prop correctly to FileContentElementMenu", () => {
			const { wrapper, urlProp } = setup(true);

			const url = wrapper.findComponent(FileContentElementMenu).props("url");

			expect(url).toBe(urlProp);
		});

		it("should hand over isDownloadAllowed prop correctly to FileContentElementMenu", () => {
			const { wrapper, isDownloadAllowedProp } = setup(true);

			const isDownloadAllowed = wrapper
				.findComponent(FileContentElementMenu)
				.props("isDownloadAllowed");

			expect(isDownloadAllowed).toBe(isDownloadAllowedProp);
		});

		it("should hand over isFirstElement prop correctly to FileContentElementMenu", () => {
			const { wrapper, isFirstElementProp } = setup(true);

			const isFirstElement = wrapper
				.findComponent(FileContentElementMenu)
				.props("isFirstElement");

			expect(isFirstElement).toBe(isFirstElementProp);
		});

		it("should hand over isLastElement prop correctly to FileContentElementMenu", () => {
			const { wrapper, isLastElementProp } = setup(true);

			const isLastElement = wrapper
				.findComponent(FileContentElementMenu)
				.props("isLastElement");

			expect(isLastElement).toBe(isLastElementProp);
		});

		it("should hand over hasMultipleElements prop correctly to FileContentElementMenu", () => {
			const { wrapper, hasMultipleElementsProp } = setup(true);

			const hasMultipleElements = wrapper
				.findComponent(FileContentElementMenu)
				.props("hasMultipleElements");

			expect(hasMultipleElements).toBe(hasMultipleElementsProp);
		});

		it("should forward delete:element from FileContentElementMenu", () => {
			const { wrapper } = setup(true);
			const menu = wrapper.findComponent(FileContentElementMenu);

			menu.vm.$emit("delete:element");

			expect(wrapper.emitted("delete:element")).toHaveLength(1);
		});

		it("should forward move-down:element from FileContentElementMenu", () => {
			const { wrapper } = setup(true);
			const menu = wrapper.findComponent(FileContentElementMenu);

			menu.vm.$emit("move-down:element");

			expect(wrapper.emitted("move-down:element")).toHaveLength(1);
		});

		it("should forward move-down:up from FileContentElementMenu", () => {
			const { wrapper } = setup(true);
			const menu = wrapper.findComponent(FileContentElementMenu);

			menu.vm.$emit("move-up:element");

			expect(wrapper.emitted("move-up:element")).toHaveLength(1);
		});
	});
});
