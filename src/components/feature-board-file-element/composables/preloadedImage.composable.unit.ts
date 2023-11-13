import { mount } from "@vue/test-utils";
import { defineComponent } from "vue";
import { usePreloadedImage } from "./preloadedImage.composable";

describe("PreloadedImage composable", () => {
	const getWrapper = () => {
		const url = "https://example.com/image.png";
		let composable: ReturnType<typeof usePreloadedImage> | undefined;

		const TestComponent = defineComponent({
			template: "<div/>",
			setup() {
				composable = usePreloadedImage(url);
			},
		});

		const wrapper = mount(TestComponent, {});
		return { wrapper, composable, url };
	};

	describe("when image is not loaded", () => {
		it("should return isImageLoading as true", () => {
			const { composable } = getWrapper();

			expect(composable?.isImageLoading.value).toBeTruthy();
		});
	});

	describe("when image is loaded", () => {
		const setup = () => {
			const imageMock = {
				src: "",
				onload: jest.fn(),
			};

			const imageSpy = jest.spyOn(global, "Image").mockImplementation(() => {
				return imageMock as unknown as HTMLImageElement;
			});

			const { composable, url } = getWrapper();

			imageMock.onload();

			return { composable, url, imageSpy, imageMock };
		};

		it("should return isImageLoading as true", () => {
			const { composable, imageMock, imageSpy, url } = setup();

			expect(imageSpy).toHaveBeenCalledTimes(1);
			expect(imageMock.src).toBe(url);
			expect(composable?.isImageLoading.value).toBeFalsy();
		});
	});
});
