import { I18N_KEY } from "@/utils/inject";
import { fileElementResponseFactory, i18nMock } from "@@/tests/test-utils";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { ColorOverlay } from "@ui-color-overlay";
import { shallowMount } from "@vue/test-utils";
import { ref } from "vue";
import { usePreloadedImage } from "../../../composables/preloadedImage.composable";
import PdfDisplay from "./PdfDisplay.vue";

jest.mock("../../../composables/preloadedImage.composable");

const mockedUsePreloadedImage = jest.mocked(usePreloadedImage);

describe("PdfDisplay", () => {
	const setup = (props: { isImageLoading: boolean }) => {
		document.body.setAttribute("data-app", "true");

		const element = fileElementResponseFactory.build();
		const propsData = {
			src: "url/1/file-record #1.txt",
			previewSrc: "preview/1/file-record #1.txt",
			name: "file-record #1.txt",
			element,
		};

		mockedUsePreloadedImage.mockReset();
		mockedUsePreloadedImage.mockReturnValue({
			isImageLoading: ref(props.isImageLoading ?? false),
		});

		const wrapper = shallowMount(PdfDisplay, {
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
		};
	};

	describe("when isImageLoading is true", () => {
		it("should show loading spinner", () => {
			const { wrapper } = setup({ isImageLoading: true });

			const loadingSpinner = wrapper.findComponent({
				name: "VProgressCircular",
			});

			expect(loadingSpinner.exists()).toBe(true);
		});

		it("should not show image", () => {
			const { wrapper } = setup({ isImageLoading: true });

			const image = wrapper.find("img");

			expect(image.exists()).toBe(false);
		});
	});

	describe("when isImageLoading is false", () => {
		it("should not show loading spinner", () => {
			const { wrapper } = setup({ isImageLoading: false });

			const loadingSpinner = wrapper.findComponent({
				name: "VProgressCircular",
			});

			expect(loadingSpinner.exists()).toBe(false);
		});

		it("should show image", () => {
			const { wrapper } = setup({ isImageLoading: false });

			const image = wrapper.find("img");

			expect(image.exists()).toBe(true);
		});

		describe("when color overlay emits on:action", () => {
			it("should call open function", () => {
				const { wrapper, src } = setup({
					isImageLoading: false,
				});

				const windowOpenSpy = jest.spyOn(window, "open");
				const colorOverlay = wrapper.findComponent(ColorOverlay);

				colorOverlay.vm.$emit("on:action");

				expect(windowOpenSpy).toHaveBeenCalledTimes(1);
				expect(windowOpenSpy).toHaveBeenCalledWith(src, "_blank");
			});
		});
	});
});
