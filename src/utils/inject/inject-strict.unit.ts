import { InjectionKey } from "vue";
import { injectStrict } from "./inject-strict";
import { mountComposable } from "@@/tests/test-utils/mountComposable";

const PROVIDER_KEY: InjectionKey<string> = Symbol("provider");

describe("injectStrict", () => {
	describe("when resource is provided", () => {
		it("should return the provided resource", () => {
			const { provider } = mountComposable(
				() => {
					const provider = injectStrict(PROVIDER_KEY);
					return { provider };
				},
				{
					[PROVIDER_KEY as symbol]: "provided",
				}
			);

			expect(provider).toEqual("provided");
		});
	});

	describe("otherwise when resource is NOT provided", () => {
		it("should throw if no default is given", () => {
			expect(() => {
				mountComposable(() => {
					const provider = injectStrict(PROVIDER_KEY);
					return { provider };
				});
			}).toThrow();
		});

		it("should return the default when given", () => {
			const { provider } = mountComposable(() => {
				const provider = injectStrict(PROVIDER_KEY, "default");
				return { provider };
			});

			expect(provider).toEqual("default");
		});
	});
});
