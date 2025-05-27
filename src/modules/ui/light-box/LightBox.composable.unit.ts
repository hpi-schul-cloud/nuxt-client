import { mountComposable } from "@@/tests/test-utils/mountComposable";
import {
	LightBoxOptions,
	LightBoxContentType,
	useInternalLightBox,
	useLightBox,
} from "./LightBox.composable";
import { createTestingI18n } from "@@/tests/test-utils/setup";

describe("LightBox composable", () => {
	describe("useLightBox", () => {
		const setup = () => {
			const { open, isLightBoxOpen } = mountComposable(() => useLightBox(), {
				global: { plugins: [createTestingI18n()] },
			});

			return {
				open,
				isLightBoxOpen,
			};
		};

		beforeEach(() => {
			jest.clearAllMocks();
		});

		describe("open", () => {
			describe("when open is called", () => {
				it("should open the LightBox", async () => {
					const { open, isLightBoxOpen } = setup();

					expect(isLightBoxOpen.value).toBe(false);

					const data: LightBoxOptions = {
						type: LightBoxContentType.IMAGE,
						downloadUrl: "url-string",
						previewUrl: "previewUrl-string",
						alt: "alt-string",
						name: "name-string",
					};
					open(data);

					expect(isLightBoxOpen.value).toBe(true);
				});
			});
		});
	});

	describe("useInternalLightBox", () => {
		const setup = () => {
			const { close, isLightBoxOpen, lightBoxOptions, openInternal } =
				mountComposable(() => useInternalLightBox(), {
					global: { mocks: { t: (k: string) => k } },
				});

			return {
				close,
				isLightBoxOpen,
				lightBoxOptions,
				openInternal,
			};
		};

		beforeEach(() => {
			jest.clearAllMocks();
		});

		describe("when openInternal is called", () => {
			it("should open the LightBox", async () => {
				const { openInternal, isLightBoxOpen, lightBoxOptions } = setup();

				isLightBoxOpen.value = false;

				const data: LightBoxOptions = {
					type: LightBoxContentType.IMAGE,
					downloadUrl: "url-string",
					previewUrl: "previewUrl-string",
					alt: "alt-string",
					name: "name-string",
				};
				openInternal(data);

				expect(isLightBoxOpen.value).toBe(true);
				expect(lightBoxOptions.value).toEqual(data);
			});
		});

		describe("when close is called", () => {
			it("should close the LightBox and set lightBoxOptions to undefined", async () => {
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
