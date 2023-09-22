import { I18N_KEY } from "@/utils/inject";
import { mountComposable } from "@@/tests/test-utils/mountComposable";
import { useLightBox } from "./LightBox.composable";

describe("Confirmation composable", () => {
	describe("open", () => {
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

		describe("when open is called", () => {
			it("should open the LightBox", async () => {
				const { open, isLightBoxOpen } = setup();

				expect(isLightBoxOpen.value).toBe(false);

				const data = {
					url: "url-string",
					alt: "alt-string",
					name: "name-string",
				};
				open(data);

				expect(isLightBoxOpen.value).toBe(true);
			});
		});
	});
});
