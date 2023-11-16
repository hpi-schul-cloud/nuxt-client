import { convertDownloadToPreviewUrl } from "@/utils/fileHelper";
import { I18N_KEY } from "@/utils/inject";
import { fileElementResponseFactory, i18nMock } from "@@/tests/test-utils";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { ColorOverlay } from "@ui-color-overlay";
import { LightBoxOptions, useLightBox } from "@ui-light-box";
import { shallowMount } from "@vue/test-utils";
import { ref } from "vue";
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
			src: "url/1/file-record #1.txt",
			previewSrc: "preview/1/file-record #1.txt",
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
			src: propsData.src,
			nameProp: propsData.name,
			previewSrc: propsData.previewSrc,
			element,
			open,
		};
	};
	const imageSelektor = "v-img-stub";

	describe("when isEditMode is false", () => {
		it("should be found in dom", () => {
			const { wrapper } = setup({ isEditMode: false });

			const fileContentElement = wrapper.findComponent(ImageDisplay);

			expect(fileContentElement.exists()).toBe(true);
		});

		it("should render color overlay with correct props", () => {
			const { wrapper } = setup({ isEditMode: false });

			const colorOverlay = wrapper.findComponent(ColorOverlay);

			expect(colorOverlay.exists()).toBe(true);
			expect(colorOverlay.props("isOverlayDisabled")).toBe(false);
			expect(colorOverlay.props("color")).toBe("var(--v-black-base)");
			expect(colorOverlay.props("opacity")).toBeUndefined;
		});

		it("should display image with correct props", () => {
			const { wrapper, previewSrc, nameProp } = setup({ isEditMode: false });

			const image = wrapper.find(imageSelektor);

			expect(image.exists()).toBe(true);
			expect(image.attributes("loading")).toBe("lazy");
			expect(image.attributes("src")).toBe(previewSrc);
			expect(image.attributes("alt")).toBe(
				"components.cardElement.fileElement.emptyAlt " + nameProp
			);
		});

		describe("when alternative text is defined", () => {
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

		describe("when alternative text is undefined", () => {
			it("should have set alt correctly", () => {
				const { wrapper, nameProp } = setup({ isEditMode: false });

				const alt = wrapper.find(imageSelektor).attributes("alt");

				expect(alt).toBe(
					"components.cardElement.fileElement.emptyAlt " + nameProp
				);
			});
		});

		describe("when color overlay emits on:action", () => {
			it("should call open function", () => {
				const alternativeText = "alternative text";
				const { wrapper, src, nameProp, open } = setup({
					isEditMode: false,
					alternativeText,
				});
				const options: LightBoxOptions = {
					downloadUrl: src,
					previewUrl: src,
					alt: alternativeText,
					name: nameProp,
				};

				const colorOverlay = wrapper.findComponent(ColorOverlay);
				colorOverlay.vm.$emit("on:action");

				expect(open).toHaveBeenCalledTimes(1);
				expect(open).toHaveBeenCalledWith(options);
			});
		});
	});

	describe("when isEditMode is true", () => {
		it("should be found in dom", () => {
			const { wrapper } = setup({ isEditMode: true });

			const fileContentElement = wrapper.findComponent(ImageDisplay);

			expect(fileContentElement.exists()).toBe(true);
		});

		it("should render color overlay with correct props", () => {
			const { wrapper } = setup({ isEditMode: true });

			const colorOverlay = wrapper.findComponent(ColorOverlay);

			expect(colorOverlay.exists()).toBe(true);
			expect(colorOverlay.props("isOverlayDisabled")).toBe(true);
			expect(colorOverlay.props("color")).toBe("var(--v-black-base)");
			expect(colorOverlay.props("opacity")).toBeUndefined;
		});

		it("should display image with correct props", () => {
			const { wrapper, previewSrc } = setup({ isEditMode: true });

			const image = wrapper.find(imageSelektor);

			expect(image.exists()).toBe(true);
			expect(image.attributes("src")).toBe(previewSrc);
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
	});
});
