import { InjectionKey } from "vue";
import { injectStrict } from "./inject-strict";
import { mountComposable } from "@@/tests/test-utils/mountComposable";

const PROVIDER_KEY: InjectionKey<string> = Symbol("provider");
const BOOLEAN_PROVIDER_KEY: InjectionKey<boolean> = Symbol("booleanProvider");

describe("injectStrict", () => {
	describe("when string-resource is provided", () => {
		it("should return the provided resource", () => {
			const { provider } = mountComposable(
				() => {
					const provider = injectStrict(PROVIDER_KEY);
					return { provider };
				},
				{
					[PROVIDER_KEY.valueOf()]: "provided",
				}
			);

			expect(provider).toEqual("provided");
		});
	});

	describe("when boolean-false-resource is provided", () => {
		it("should return the provided value: false", () => {
			const { provider } = mountComposable(
				() => {
					const provider = injectStrict(BOOLEAN_PROVIDER_KEY);
					return { provider };
				},
				{
					[BOOLEAN_PROVIDER_KEY.valueOf()]: false,
				}
			);

			expect(provider).toEqual(false);
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
