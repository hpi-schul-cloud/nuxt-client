import { mountComposable } from "@@/tests/test-utils/mountComposable";
import {
	LightBoxOptions,
	LightBoxContentType,
	useLightBox,
} from "./LightBox.composable";
import { createTestingI18n } from "@@/tests/test-utils/setup";

describe("LightBox composable", () => {
	describe("useLightBox", () => {
		const setup = () => {
			const { close, isLightBoxOpen, lightBoxOptions, open } = mountComposable(
				() => useLightBox(),
				{
					global: { plugins: [createTestingI18n()] },
				}
			);

			return {
				close,
				isLightBoxOpen,
				lightBoxOptions,
				open,
			};
		};

		beforeEach(() => {
			jest.clearAllMocks();
		});

		describe("when open is called", () => {
			it("should open the LightBox and set the LightBoxOptions", async () => {
				const { open, isLightBoxOpen, lightBoxOptions } = setup();

				isLightBoxOpen.value = false;

				const data: LightBoxOptions = {
					type: LightBoxContentType.IMAGE,
					downloadUrl: "url-string",
					previewUrl: "previewUrl-string",
					alt: "alt-string",
					name: "name-string",
				};
				open(data);

				expect(isLightBoxOpen.value).toBe(true);
				expect(lightBoxOptions.value).toEqual(data);
			});
		});

		describe("when close is called", () => {
			it("should close the LightBox", async () => {
				const { close, isLightBoxOpen, lightBoxOptions } = setup();

				isLightBoxOpen.value = true;
				lightBoxOptions.value = {
					type: LightBoxContentType.IMAGE,
					downloadUrl: "downloadUrl-string",
					previewUrl: "previewUrl-string",
					alt: "alt-string",
					name: "name-string",
				};
				close();

				expect(isLightBoxOpen.value).toBe(false);
			});
		});
	});
});
