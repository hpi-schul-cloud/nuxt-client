import { useNaturalwidth } from "./NaturalWidth.composable";

describe("useNaturalwidth", () => {
	describe("when image is smaller than parent element", () => {
		const setup = () => {
			const { imageRef, imageWidth, setWidth } = useNaturalwidth();
			imageRef.value = {
				image: {
					naturalWidth: 100,
				},
				$parent: {
					$el: {
						clientWidth: 1000,
					},
				},
			};

			return {
				imageWidth,
				setWidth,
			};
		};

		it("should return imageRef, imageWidth and setWidth", () => {
			// Arrange
			const { imageWidth, setWidth } = setup();
			// Act
			setWidth();
			// Assert
			expect(imageWidth.value).toEqual(100);
		});
	});

	describe("when image is bigger than parent element", () => {
		const setup = () => {
			const { imageRef, imageWidth, setWidth } = useNaturalwidth();
			imageRef.value = {
				image: {
					naturalWidth: 1000,
				},
				$parent: {
					$el: {
						clientWidth: 100,
					},
				},
			};

			return {
				imageWidth,
				setWidth,
			};
		};

		it("should return imageRef, imageWidth and setWidth", () => {
			// Arrange
			const { imageWidth, setWidth } = setup();
			// Act
			setWidth();
			// Assert
			expect(imageWidth.value).toEqual(1000);
		});
	});
});
