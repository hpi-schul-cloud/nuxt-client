import { convertDownloadToPreviewUrl } from "@/utils/fileHelper";
import { I18N_KEY } from "@/utils/inject";
import { fileElementResponseFactory, i18nMock } from "@@/tests/test-utils";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { LightBoxOptions, useLightBox } from "@ui-light-box";
import { shallowMount } from "@vue/test-utils";
import { nextTick, ref } from "vue";
import ImageDisplay from "./ImageDisplay.vue";

jest.mock("@ui-light-box");
jest.mock("@/utils/fileHelper");

const mockedUseLightBox = jest.mocked(useLightBox);
const mockedConvertDownloadToPreviewUrl = jest.mocked(
	convertDownloadToPreviewUrl
);

describe("ImageDisplay", () => {
	const setup = (props: { isEditMode: boolean; alternativeText?: string }) => {
		document.body.setAttribute("data-app", "true");

		const element = fileElementResponseFactory.build({
			content: { alternativeText: props.alternativeText },
		});
		const propsData = {
			url: "url/1/file-record #1.txt",
			previewUrl: "preview/1/file-record #1.txt",
			name: "file-record #1.txt",
			isEditMode: props.isEditMode,
			element,
		};

		const isLightBoxOpen = ref(false);
		const open = jest.fn();
		mockedUseLightBox.mockReturnValue({ isLightBoxOpen, open });

		mockedConvertDownloadToPreviewUrl.mockImplementation(
			(downloadUrl) => downloadUrl
		);

		const wrapper = shallowMount(ImageDisplay, {
			attachTo: document.body,
			propsData,
			...createComponentMocks({ i18n: true }),
			provide: {
				[I18N_KEY.valueOf()]: i18nMock,
			},
		});

		return {
			wrapper,
			urlProp: propsData.url,
			nameProp: propsData.name,
			previewUrlProp: propsData.previewUrl,
			element,
			open,
		};
	};
	const imageSelektor = "img";

	describe("when isEditMode is false", () => {
		it("should be found in dom", () => {
			const { wrapper } = setup({ isEditMode: false });

			const fileContentElement = wrapper.findComponent(ImageDisplay);

			expect(fileContentElement.exists()).toBe(true);
		});

		it("should display image", () => {
			const { wrapper } = setup({ isEditMode: false });

			const image = wrapper.find(imageSelektor);

			expect(image.exists()).toBe(true);
		});

		it("should have set loading to lazy", () => {
			const { wrapper } = setup({ isEditMode: false });

			const loading = wrapper.find(imageSelektor).attributes("loading");

			expect(loading).toBe("lazy");
		});

		it("should have set loading before src", () => {
			// This test ensures that "loading" attribute is rendered before "src",
			// because the order of attributes is crucial for lazy loading to work.
			const { wrapper, nameProp } = setup({ isEditMode: false });

			const renderedImageTag = wrapper.find(imageSelektor).html();
			const expectedHtml = `<img loading="lazy" src="preview/1/${nameProp}" alt="components.cardElement.fileElement.emptyAlt ${nameProp}" class="image-display-image rounded-t-sm">`;

			expect(renderedImageTag).toBe(expectedHtml);
		});

		it("should have set src correctly", () => {
			const { wrapper, previewUrlProp } = setup({ isEditMode: false });

			const src = wrapper.find(imageSelektor).attributes("src");

			expect(src).toBe(previewUrlProp);
		});

		it("should have set alt correctly", () => {
			const { wrapper, nameProp } = setup({ isEditMode: false });

			const alt = wrapper.find(imageSelektor).attributes("alt");

			expect(alt).toBe(
				"components.cardElement.fileElement.emptyAlt " + nameProp
			);
		});

		describe("When alternative text is defined", () => {
			it("should have set alt correctly", () => {
				const alternativeText = "alternative text";
				const { wrapper } = setup({
					isEditMode: false,
					alternativeText,
				});

				const alt = wrapper.find(imageSelektor).attributes("alt");

				expect(alt).toBe(alternativeText);
			});
		});

		describe("When alternative text is undefined", () => {
			it("should have set alt correctly", () => {
				const { wrapper, nameProp } = setup({ isEditMode: false });

				const alt = wrapper.find(imageSelektor).attributes("alt");

				expect(alt).toBe(
					"components.cardElement.fileElement.emptyAlt " + nameProp
				);
			});
		});

		it("should call open function, when the container is clicked", () => {
			const alternativeText = "alternative text";
			const { wrapper, urlProp, nameProp, open } = setup({
				isEditMode: false,
				alternativeText,
			});
			const options: LightBoxOptions = {
				downloadUrl: urlProp,
				previewUrl: urlProp,
				alt: alternativeText,
				name: nameProp,
			};

			const container = wrapper.find(".image-display-container");
			container.trigger("click");

			expect(open).toHaveBeenCalledTimes(1);
			expect(open).toHaveBeenCalledWith(options);
		});

		it("should call open function, when the image is clicked", () => {
			const alternativeText = "alternative text";
			const { wrapper, urlProp, nameProp, open } = setup({
				isEditMode: false,
				alternativeText,
			});
			const options: LightBoxOptions = {
				downloadUrl: urlProp,
				previewUrl: urlProp,
				alt: alternativeText,
				name: nameProp,
			};

			const image = wrapper.find(".image-display-image");
			image.trigger("click");

			expect(open).toHaveBeenCalledTimes(1);
			expect(open).toHaveBeenCalledWith(options);
		});

		it("should call open function, when the overlay is clicked", async () => {
			const alternativeText = "alternative text";
			const { wrapper, urlProp, nameProp, open } = setup({
				isEditMode: false,
				alternativeText,
			});
			const options: LightBoxOptions = {
				downloadUrl: urlProp,
				previewUrl: urlProp,
				alt: alternativeText,
				name: nameProp,
			};

			wrapper.trigger("focusin");
			await nextTick();

			const overlay = wrapper.find(".image-display-overlay");

			expect(overlay.exists()).toBe(true);
			expect(overlay.isVisible()).toBe(true);

			overlay.trigger("click");

			expect(open).toHaveBeenCalledTimes(1);
			expect(open).toHaveBeenCalledWith(options);
		});

		it("should show overlay, when the image is focused, and hide it, when not (using focusin and focusout)", async () => {
			const { wrapper } = setup({ isEditMode: false });

			wrapper.trigger("focusin");
			await nextTick();

			const overlayFocusIn = wrapper.find(".image-display-overlay");

			expect(overlayFocusIn.exists()).toBe(true);
			expect(overlayFocusIn.isVisible()).toBe(true);

			wrapper.trigger("focusout");
			await nextTick();

			const overlayFocusOut = wrapper.find(".image-display-overlay");

			expect(overlayFocusOut.exists()).toBe(false);
		});

		it("should show overlay, when the image is focused, and hide it, when not (using focus and blur)", async () => {
			const { wrapper } = setup({ isEditMode: false });

			const container = wrapper.find(".image-display-container")
				.element as HTMLDivElement;

			expect(document.activeElement).toBe(document.body);

			container.focus();
			await nextTick();

			expect(document.activeElement).toBe(container);

			const overlayFocus = wrapper.find(".image-display-overlay");

			expect(overlayFocus.exists()).toBe(true);
			expect(overlayFocus.isVisible()).toBe(true);

			container.blur();
			await nextTick();

			expect(document.activeElement).toBe(document.body);

			const overlayBlur = wrapper.find(".image-display-overlay");

			expect(overlayBlur.exists()).toBe(false);
		});

		it("should call open function, when Enter key is pressed", async () => {
			const alternativeText = "alternative text";
			const { wrapper, urlProp, nameProp, open } = setup({
				isEditMode: false,
				alternativeText,
			});
			const options: LightBoxOptions = {
				downloadUrl: urlProp,
				previewUrl: urlProp,
				alt: alternativeText,
				name: nameProp,
			};

			const container = wrapper.find(".image-display-container");
			container.trigger("keydown.enter");
			await nextTick();

			expect(open).toHaveBeenCalledTimes(1);
			expect(open).toHaveBeenCalledWith(options);
		});

		it("should call open function, when Space key is pressed", async () => {
			const alternativeText = "alternative text";
			const { wrapper, urlProp, nameProp, open } = setup({
				isEditMode: false,
				alternativeText,
			});
			const options: LightBoxOptions = {
				downloadUrl: urlProp,
				previewUrl: urlProp,
				alt: alternativeText,
				name: nameProp,
			};

			const container = wrapper.find(".image-display-container");
			container.trigger("keydown.space");
			await nextTick();

			expect(open).toHaveBeenCalledTimes(1);
			expect(open).toHaveBeenCalledWith(options);
		});

		it("should show overlay, when the user hovers over the image, and hides when not", async () => {
			const { wrapper } = setup({ isEditMode: false });

			wrapper.trigger("mouseenter");
			await nextTick();

			const overlayEnter = wrapper.find(".image-display-overlay");

			expect(overlayEnter.exists()).toBe(true);
			expect(overlayEnter.isVisible()).toBe(true);

			wrapper.trigger("mouseleave");
			await nextTick();

			const overlayLeave = wrapper.find(".image-display-overlay");

			expect(overlayLeave.exists()).toBe(false);
		});
	});

	describe("when isEditMode is true", () => {
		it("should be found in dom", () => {
			const { wrapper } = setup({ isEditMode: true });

			const fileContentElement = wrapper.findComponent(ImageDisplay);

			expect(fileContentElement.exists()).toBe(true);
		});

		it("should display image", () => {
			const { wrapper } = setup({ isEditMode: true });

			const image = wrapper.find(imageSelektor);

			expect(image.exists()).toBe(true);
		});

		it("should have set src correctly", () => {
			const { wrapper, previewUrlProp } = setup({ isEditMode: true });

			const src = wrapper.find(imageSelektor).attributes("src");

			expect(src).toBe(previewUrlProp);
		});

		describe("When alternative text is defined", () => {
			it("should have set alt correctly", () => {
				const alternativeText = "alternative text";
				const { wrapper } = setup({
					isEditMode: true,
					alternativeText,
				});

				const alt = wrapper.find(imageSelektor).attributes("alt");

				expect(alt).toBe(alternativeText);
			});
		});

		describe("When alternative text is undefined", () => {
			it("should have set alt correctly", () => {
				const { wrapper, nameProp } = setup({ isEditMode: true });

				const alt = wrapper.find(imageSelektor).attributes("alt");

				expect(alt).toBe(
					"components.cardElement.fileElement.emptyAlt " + nameProp
				);
			});
		});

		it("should not call open function, when the container is clicked", () => {
			const alternativeText = "alternative text";
			const { wrapper, open } = setup({
				isEditMode: true,
				alternativeText,
			});

			const container = wrapper.find(".image-display-container");
			container.trigger("click");

			expect(open).toHaveBeenCalledTimes(0);
		});

		it("should not call open function, when the image is clicked", () => {
			const alternativeText = "alternative text";
			const { wrapper, open } = setup({
				isEditMode: true,
				alternativeText,
			});

			const image = wrapper.find(".image-display-image");
			image.trigger("click");

			expect(open).toHaveBeenCalledTimes(0);
		});

		it("should not show overlay, when the image is focused (using focusin and focusout)", async () => {
			const { wrapper } = setup({ isEditMode: true });

			wrapper.trigger("focusin");
			await nextTick();

			const overlayFocusIn = wrapper.find(".image-display-overlay");

			expect(overlayFocusIn.exists()).toBe(false);

			wrapper.trigger("focusout");
			await nextTick();

			const overlayFocusOut = wrapper.find(".image-display-overlay");

			expect(overlayFocusOut.exists()).toBe(false);
		});

		it("should not show overlay, when the image is focused (using focus and blur)", async () => {
			const { wrapper } = setup({ isEditMode: true });

			const container = wrapper.find(".image-display-container")
				.element as HTMLDivElement;

			expect(document.activeElement).toBe(document.body);

			container.focus();
			await nextTick();

			expect(document.activeElement).toBe(container);

			const overlayFocus = wrapper.find(".image-display-overlay");

			expect(overlayFocus.exists()).toBe(false);

			container.blur();
			await nextTick();

			expect(document.activeElement).toBe(document.body);

			const overlayBlur = wrapper.find(".image-display-overlay");

			expect(overlayBlur.exists()).toBe(false);
		});

		it("should not call open function, when Enter key is pressed", async () => {
			const alternativeText = "alternative text";
			const { wrapper, open } = setup({
				isEditMode: true,
				alternativeText,
			});

			const container = wrapper.find(".image-display-container");
			container.trigger("keydown.enter");
			await nextTick();

			expect(open).toHaveBeenCalledTimes(0);
		});

		it("should not call open function, when Space key is pressed", async () => {
			const alternativeText = "alternative text";
			const { wrapper, open } = setup({
				isEditMode: true,
				alternativeText,
			});

			const container = wrapper.find(".image-display-container");
			container.trigger("keydown.space");
			await nextTick();

			expect(open).toHaveBeenCalledTimes(0);
		});

		it("should not show overlay, when the user hovers over the image", async () => {
			const { wrapper } = setup({ isEditMode: true });

			wrapper.trigger("mouseenter");
			await nextTick();

			const overlayEnter = wrapper.find(".image-display-overlay");

			expect(overlayEnter.exists()).toBe(false);

			wrapper.trigger("mouseleave");
			await nextTick();

			const overlayLeave = wrapper.find(".image-display-overlay");

			expect(overlayLeave.exists()).toBe(false);
		});
	});
});
