import { convertDownloadToPreviewUrl } from "@/utils/fileHelper";
import { fileElementResponseFactory } from "@@/tests/test-utils";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { LightBoxOptions, useLightBox } from "@ui-light-box";
import { mount } from "@vue/test-utils";
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

		const wrapper = mount(ImageDisplay, {
			props: propsData,
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
				stubs: { PreviewImage: true },
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
	const imageSelektor = "preview-image-stub";

	describe("when isEditMode is false", () => {
		it("should be found in dom", () => {
			const { wrapper } = setup({ isEditMode: false });

			const fileContentElement = wrapper.findComponent(ImageDisplay);

			expect(fileContentElement.exists()).toBe(true);
		});

		it("should display image with correct props", () => {
			const { wrapper, previewSrc, nameProp } = setup({ isEditMode: false });

			const image = wrapper.find(imageSelektor);

			expect(image.exists()).toBe(true);
			expect(image.attributes("cover")).toBe("true");
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

		describe("when div emits click", () => {
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

				const image = wrapper.find(imageSelektor);
				expect(image.exists()).toBe(true);
				image.trigger("click");

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
