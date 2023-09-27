import { I18N_KEY } from "@/utils/inject";
import { mountComposable } from "@@/tests/test-utils/mountComposable";
import { useInternalLightBox, useLightBox } from "./LightBox.composable";

describe("LightBox composable", () => {
	describe("useLightBox", () => {
		const setup = () => {
			const { open, isLightBoxOpen } = mountComposable(() => useLightBox(), {
				[I18N_KEY.valueOf()]: { t: (k: string) => k },
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

					const data = {
						url: "url-string",
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
					[I18N_KEY.valueOf()]: { t: (k: string) => k },
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
				lightBoxOptions.value = undefined;

				const data = {
					url: "url-string",
					previewUrl: "previewUrl-string",
					alt: "alt-string",
					name: "name-string",
				};
				openInternal(data);

				expect(isLightBoxOpen.value).toBe(true);
				expect(lightBoxOptions.value).toBe(data);
			});
		});

		describe("when close is called", () => {
			it("should close the LightBox and set lightBoxOptions to undefined", async () => {
				const { close, isLightBoxOpen, lightBoxOptions } = setup();

				isLightBoxOpen.value = true;
				lightBoxOptions.value = {
					url: "url-string",
					previewUrl: "previewUrl-string",
					alt: "alt-string",
					name: "name-string",
				};
				close();

				expect(isLightBoxOpen.value).toBe(false);
				expect(lightBoxOptions.value).toBeUndefined();
			});
		});
	});
});
