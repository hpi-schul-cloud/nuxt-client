import { mountComposable } from "@@/tests/test-utils/mountComposable";
import {
	LightBoxOptions,
	useInternalLightBox,
	useLightBox,
} from "./LightBox.composable";
import { createTestingI18n } from "@@/tests/test-utils/setup";

const defaultLightBoxOptions: LightBoxOptions = {
	downloadUrl: "",
	previewUrl: "",
	alt: "",
	name: "",
};

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
			vi.clearAllMocks();
		});

		describe("open", () => {
			describe("when open is called", () => {
				it("should open the LightBox", async () => {
					const { open, isLightBoxOpen } = setup();

					expect(isLightBoxOpen.value).toBe(false);

					const data: LightBoxOptions = {
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
			vi.clearAllMocks();
		});

		describe("when openInternal is called", () => {
			it("should open the LightBox", async () => {
				const { openInternal, isLightBoxOpen, lightBoxOptions } = setup();

				isLightBoxOpen.value = false;
				lightBoxOptions.value = defaultLightBoxOptions;

				const data: LightBoxOptions = {
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
					downloadUrl: "downloadUrl-string",
					previewUrl: "previewUrl-string",
					alt: "alt-string",
					name: "name-string",
				};
				close();

				expect(isLightBoxOpen.value).toBe(false);
				expect(lightBoxOptions.value).toStrictEqual(defaultLightBoxOptions);
			});
		});
	});
});
